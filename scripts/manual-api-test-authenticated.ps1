$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3000'
$email = 'manual.debug.20260331192736@example.com'
$password = 'TestPass!12345'
$results = New-Object System.Collections.Generic.List[object]

function Add-Result {
  param([string]$Test,[int]$Status,[string]$Outcome,[string]$Details)
  $results.Add([pscustomobject]@{ Test=$Test; Status=$Status; Outcome=$Outcome; Details=$Details })
}

function Invoke-Json {
  param(
    [string]$Method,
    [string]$Url,
    $Body = $null,
    $Session = $null,
    [string]$ContentType = 'application/json'
  )

  $params = @{ Method=$Method; Uri=$Url; UseBasicParsing=$true }
  if ($Session) { $params.WebSession = $Session }

  if ($null -ne $Body) {
    if ($ContentType -eq 'application/json') {
      $params.Body = ($Body | ConvertTo-Json -Depth 8)
    } else {
      $params.Body = $Body
    }
    $params.ContentType = $ContentType
  }

  $statusCode = 0
  $content = ''

  try {
    $resp = Invoke-WebRequest @params
    $statusCode = [int]$resp.StatusCode
    $content = [string]$resp.Content
  } catch {
    $webResponse = $_.Exception.Response
    if ($webResponse) {
      $statusCode = [int]$webResponse.StatusCode
      $stream = $webResponse.GetResponseStream()
      if ($stream) {
        $reader = New-Object System.IO.StreamReader($stream)
        $content = $reader.ReadToEnd()
        $reader.Close()
      }
    } else {
      throw
    }
  }

  $parsed = $null
  if ($content) {
    try { $parsed = $content | ConvertFrom-Json } catch { $parsed = $null }
  }

  return [pscustomobject]@{ StatusCode=$statusCode; Json=$parsed; Raw=$content }
}

# Unauthorized guard checks
$r1 = Invoke-Json -Method GET -Url "$base/api/applications"
Add-Result -Test 'applications unauthorized guard' -Status $r1.StatusCode -Outcome ($(if($r1.StatusCode -eq 401){'PASS'}else{'FAIL'})) -Details ($r1.Json.error)

$r2 = Invoke-Json -Method GET -Url "$base/api/documents"
Add-Result -Test 'documents unauthorized guard' -Status $r2.StatusCode -Outcome ($(if($r2.StatusCode -eq 401){'PASS'}else{'FAIL'})) -Details ($r2.Json.error)

# Login
$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$csrf = Invoke-Json -Method GET -Url "$base/api/auth/csrf" -Session $session
$csrfToken = $csrf.Json.csrfToken
$form = "csrfToken=$csrfToken&email=$email&password=$password&callbackUrl=$base%2F&json=true"
$login = Invoke-Json -Method POST -Url "$base/api/auth/callback/credentials" -Body $form -Session $session -ContentType 'application/x-www-form-urlencoded'
$me = Invoke-Json -Method GET -Url "$base/api/auth/me" -Session $session
$authOk = $me.StatusCode -eq 200 -and $me.Json.data.email -eq $email
Add-Result -Test 'auth login + session me' -Status $me.StatusCode -Outcome ($(if($authOk){'PASS'}else{'FAIL'})) -Details "loginStatus=$($login.StatusCode); meEmail=$($me.Json.data.email)"

# Fetch valid university/program ids
$uniResp = Invoke-Json -Method GET -Url "$base/api/universities?page=1&pageSize=50"
$uni = $null
if ($uniResp.Json -and $uniResp.Json.data) {
  $uni = $uniResp.Json.data | Where-Object { $_.primaryProgramId } | Select-Object -First 1
}
$universityId = $uni.id
$programId = $uni.primaryProgramId
$seedOk = $uniResp.StatusCode -eq 200 -and $universityId -and $programId
Add-Result -Test 'seed ids available' -Status $uniResp.StatusCode -Outcome ($(if($seedOk){'PASS'}else{'FAIL'})) -Details "universityId=$universityId; programId=$programId"

# Applications list
$appList = Invoke-Json -Method GET -Url "$base/api/applications?page=1&pageSize=10" -Session $session
Add-Result -Test 'applications list authorized' -Status $appList.StatusCode -Outcome ($(if($appList.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "total=$($appList.Json.meta.total)"

# Applications invalid create
$appInvalid = Invoke-Json -Method POST -Url "$base/api/applications" -Body @{} -Session $session
Add-Result -Test 'applications invalid create validation' -Status $appInvalid.StatusCode -Outcome ($(if($appInvalid.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($appInvalid.Json.error)

# Applications valid create
$appCreate = Invoke-Json -Method POST -Url "$base/api/applications" -Body @{ universityId=$universityId; programId=$programId } -Session $session
$appId = $null
$sectionId = $null
if ($appCreate.Json -and $appCreate.Json.data) {
  $appId = $appCreate.Json.data.id
  if ($appCreate.Json.data.sections -and $appCreate.Json.data.sections.Count -gt 0) {
    $sectionId = $appCreate.Json.data.sections[0].id
  }
}
$createOk = (($appCreate.StatusCode -eq 201) -or ($appCreate.StatusCode -eq 200)) -and $appId
Add-Result -Test 'applications valid create' -Status $appCreate.StatusCode -Outcome ($(if($createOk){'PASS'}else{'FAIL'})) -Details "appId=$appId; error=$($appCreate.Json.error)"

if ($appId) {
  $appDetail = Invoke-Json -Method GET -Url "$base/api/applications/$appId" -Session $session
  Add-Result -Test 'applications detail fetch' -Status $appDetail.StatusCode -Outcome ($(if($appDetail.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "status=$($appDetail.Json.data.status)"

  $appPatch = Invoke-Json -Method PATCH -Url "$base/api/applications/$appId" -Body @{ status='IN_PROGRESS'; sections=@(@{ type='PERSONAL_INFORMATION'; status='COMPLETED'; progress=100; data=@{ note='manual-e2e' } }) } -Session $session
  Add-Result -Test 'applications patch section' -Status $appPatch.StatusCode -Outcome ($(if($appPatch.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "progress=$($appPatch.Json.data.progress); error=$($appPatch.Json.error)"

  $appSubmit = Invoke-Json -Method PATCH -Url "$base/api/applications/$appId" -Body @{ action='submit' } -Session $session
  Add-Result -Test 'applications submit blocked until complete' -Status $appSubmit.StatusCode -Outcome ($(if($appSubmit.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($appSubmit.Json.error)

  $docInvalid = Invoke-Json -Method POST -Url "$base/api/documents" -Body @{ type='OTHER'; fileName='invalid.pdf'; fileUrl='https://example.com/invalid.pdf'; mimeType='application/pdf'; sizeBytes=0; applicationId=$appId } -Session $session
  Add-Result -Test 'documents invalid create validation' -Status $docInvalid.StatusCode -Outcome ($(if($docInvalid.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($docInvalid.Json.error)

  $docCreate = Invoke-Json -Method POST -Url "$base/api/documents" -Body @{ type='TRANSCRIPT'; label='Manual Transcript'; fileName='manual-transcript.pdf'; fileUrl='https://example.com/manual-transcript.pdf'; mimeType='application/pdf'; sizeBytes=654321; applicationId=$appId; sectionId=$sectionId } -Session $session
  $docId = $null
  if ($docCreate.Json -and $docCreate.Json.data) { $docId = $docCreate.Json.data.id }
  Add-Result -Test 'documents valid create' -Status $docCreate.StatusCode -Outcome ($(if($docCreate.StatusCode -eq 201 -and $docId){'PASS'}else{'FAIL'})) -Details "docId=$docId; error=$($docCreate.Json.error)"

  if ($docId) {
    $docList = Invoke-Json -Method GET -Url "$base/api/documents?page=1&pageSize=10&applicationId=$appId" -Session $session
    Add-Result -Test 'documents list authorized' -Status $docList.StatusCode -Outcome ($(if($docList.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "total=$($docList.Json.meta.total)"

    $docDetail = Invoke-Json -Method GET -Url "$base/api/documents/$docId" -Session $session
    Add-Result -Test 'documents detail fetch' -Status $docDetail.StatusCode -Outcome ($(if($docDetail.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "fileName=$($docDetail.Json.data.fileName)"

    $docDelete = Invoke-Json -Method DELETE -Url "$base/api/documents/$docId" -Session $session
    $docAfterDelete = Invoke-Json -Method GET -Url "$base/api/documents/$docId" -Session $session
    $docDeleteOk = $docDelete.StatusCode -eq 200 -and $docAfterDelete.StatusCode -eq 404
    Add-Result -Test 'documents delete flow' -Status $docDelete.StatusCode -Outcome ($(if($docDeleteOk){'PASS'}else{'FAIL'})) -Details "deleteStatus=$($docDelete.StatusCode); afterDeleteGet=$($docAfterDelete.StatusCode)"
  }

  $appDelete = Invoke-Json -Method DELETE -Url "$base/api/applications/$appId" -Session $session
  $appAfterDelete = Invoke-Json -Method GET -Url "$base/api/applications/$appId" -Session $session
  $appDeleteOk = $appDelete.StatusCode -eq 200 -and $appAfterDelete.StatusCode -eq 404
  Add-Result -Test 'applications delete flow' -Status $appDelete.StatusCode -Outcome ($(if($appDeleteOk){'PASS'}else{'FAIL'})) -Details "deleteStatus=$($appDelete.StatusCode); afterDeleteGet=$($appAfterDelete.StatusCode)"
}

$passCount = ($results | Where-Object { $_.Outcome -eq 'PASS' }).Count
$failCount = ($results | Where-Object { $_.Outcome -eq 'FAIL' }).Count

Write-Output '--- AUTHENTICATED MANUAL API TEST RESULTS ---'
$results | Format-Table -AutoSize | Out-String | Write-Output
Write-Output "SUMMARY: PASS=$passCount FAIL=$failCount TOTAL=$($results.Count)"
if ($failCount -gt 0) { exit 1 }
