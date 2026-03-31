$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3000'
$timestamp = Get-Date -Format 'yyyyMMddHHmmss'
$email = "manual.api.$timestamp@example.com"
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

$r1 = Invoke-Json -Method GET -Url "$base/api/auth/me"
Add-Result -Test 'auth/me unauthorized' -Status $r1.StatusCode -Outcome ($(if($r1.StatusCode -eq 401){'PASS'}else{'FAIL'})) -Details ($r1.Json.error)

$signupBody = @{ fullName='Manual API Tester'; email=$email; password=$password }
$r2 = Invoke-Json -Method POST -Url "$base/api/auth/sign-up" -Body $signupBody
$userId = $r2.Json.data.id
Add-Result -Test 'auth/sign-up create' -Status $r2.StatusCode -Outcome ($(if($r2.StatusCode -eq 201 -and $userId){'PASS'}else{'FAIL'})) -Details "email=$email"

$r3 = Invoke-Json -Method POST -Url "$base/api/auth/sign-up" -Body $signupBody
Add-Result -Test 'auth/sign-up duplicate' -Status $r3.StatusCode -Outcome ($(if($r3.StatusCode -eq 409){'PASS'}else{'FAIL'})) -Details ($r3.Json.error)

$r4 = Invoke-Json -Method GET -Url "$base/api/universities?page=1&pageSize=50"
$uni = $null
if ($r4.Json -and $r4.Json.data) {
  $uni = $r4.Json.data | Where-Object { $_.primaryProgramId } | Select-Object -First 1
}
$universityId = $uni.id
$programId = $uni.primaryProgramId
Add-Result -Test 'universities list seed' -Status $r4.StatusCode -Outcome ($(if($r4.StatusCode -eq 200 -and $universityId -and $programId){'PASS'}else{'FAIL'})) -Details "universityId=$universityId; programId=$programId"

$session = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$csrf = Invoke-Json -Method GET -Url "$base/api/auth/csrf" -Session $session
$csrfToken = $csrf.Json.csrfToken
$signInForm = @{ csrfToken=$csrfToken; email=$email; password=$password; callbackUrl="$base/"; json='true' }
$r5 = Invoke-Json -Method POST -Url "$base/api/auth/callback/credentials" -Body $signInForm -Session $session -ContentType 'application/x-www-form-urlencoded'
$r6 = Invoke-Json -Method GET -Url "$base/api/auth/me" -Session $session
Add-Result -Test 'auth credentials login + me' -Status $r6.StatusCode -Outcome ($(if($r6.StatusCode -eq 200 -and $r6.Json.data.email -eq $email){'PASS'}else{'FAIL'})) -Details "loginStatus=$($r5.StatusCode); meEmail=$($r6.Json.data.email)"

$r7 = Invoke-Json -Method GET -Url "$base/api/applications"
Add-Result -Test 'applications unauthorized' -Status $r7.StatusCode -Outcome ($(if($r7.StatusCode -eq 401){'PASS'}else{'FAIL'})) -Details ($r7.Json.error)

$r8 = Invoke-Json -Method GET -Url "$base/api/applications?page=1&pageSize=10" -Session $session
Add-Result -Test 'applications list authorized' -Status $r8.StatusCode -Outcome ($(if($r8.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "total=$($r8.Json.meta.total)"

$r9 = Invoke-Json -Method POST -Url "$base/api/applications" -Body @{} -Session $session
Add-Result -Test 'applications create invalid payload' -Status $r9.StatusCode -Outcome ($(if($r9.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($r9.Json.error)

$appCreateBody = @{ universityId=$universityId; programId=$programId }
$r10 = Invoke-Json -Method POST -Url "$base/api/applications" -Body $appCreateBody -Session $session
$appId = $null
$sectionId = $null
$sectionType = $null
if ($r10.Json -and $r10.Json.data) {
  $appId = $r10.Json.data.id
  if ($r10.Json.data.sections -and $r10.Json.data.sections.Count -gt 0) {
    $sectionId = $r10.Json.data.sections[0].id
    $sectionType = $r10.Json.data.sections[0].type
  }
}
$okCreateApp = (($r10.StatusCode -eq 201) -or ($r10.StatusCode -eq 200)) -and $appId
Add-Result -Test 'applications create valid payload' -Status $r10.StatusCode -Outcome ($(if($okCreateApp){'PASS'}else{'FAIL'})) -Details "appId=$appId; sectionType=$sectionType; error=$($r10.Json.error)"

if ($appId) {
  $r11 = Invoke-Json -Method GET -Url "$base/api/applications/$appId" -Session $session
  Add-Result -Test 'applications detail by id' -Status $r11.StatusCode -Outcome ($(if($r11.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "status=$($r11.Json.data.status)"
} else {
  Add-Result -Test 'applications detail by id' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId missing from create response'
}

if ($appId) {
  $patchBody = @{ status='IN_PROGRESS'; sections=@(@{ type='PERSONAL_INFORMATION'; status='COMPLETED'; progress=100; data=@{ verified=$true; note='manual-test' } }) }
  $r12 = Invoke-Json -Method PATCH -Url "$base/api/applications/$appId" -Body $patchBody -Session $session
  Add-Result -Test 'applications patch section update' -Status $r12.StatusCode -Outcome ($(if($r12.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "progress=$($r12.Json.data.progress); error=$($r12.Json.error)"
} else {
  Add-Result -Test 'applications patch section update' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId missing from create response'
}

if ($appId) {
  $submitBody = @{ action='submit' }
  $r13 = Invoke-Json -Method PATCH -Url "$base/api/applications/$appId" -Body $submitBody -Session $session
  Add-Result -Test 'applications submit validation' -Status $r13.StatusCode -Outcome ($(if($r13.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($r13.Json.error)
} else {
  Add-Result -Test 'applications submit validation' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId missing from create response'
}

$r14 = Invoke-Json -Method GET -Url "$base/api/documents"
Add-Result -Test 'documents unauthorized' -Status $r14.StatusCode -Outcome ($(if($r14.StatusCode -eq 401){'PASS'}else{'FAIL'})) -Details ($r14.Json.error)

$r15 = Invoke-Json -Method POST -Url "$base/api/documents" -Body @{ type='OTHER'; fileName='bad.pdf'; fileUrl='https://example.com/bad.pdf'; mimeType='application/pdf'; sizeBytes=0; applicationId=$appId } -Session $session
Add-Result -Test 'documents create invalid payload' -Status $r15.StatusCode -Outcome ($(if($r15.StatusCode -eq 400){'PASS'}else{'FAIL'})) -Details ($r15.Json.error)

if ($appId -and $sectionId) {
  $docBody = @{ type='TRANSCRIPT'; label='Official Transcript'; fileName='transcript-manual.pdf'; fileUrl='https://example.com/transcript-manual.pdf'; mimeType='application/pdf'; sizeBytes=123456; applicationId=$appId; sectionId=$sectionId }
  $r16 = Invoke-Json -Method POST -Url "$base/api/documents" -Body $docBody -Session $session
  $docId = $null
  if ($r16.Json -and $r16.Json.data) { $docId = $r16.Json.data.id }
  Add-Result -Test 'documents create valid payload' -Status $r16.StatusCode -Outcome ($(if($r16.StatusCode -eq 201 -and $docId){'PASS'}else{'FAIL'})) -Details "docId=$docId; error=$($r16.Json.error)"
} else {
  $docId = $null
  Add-Result -Test 'documents create valid payload' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId/sectionId missing from application response'
}

if ($appId) {
  $r17 = Invoke-Json -Method GET -Url "$base/api/documents?page=1&pageSize=10&applicationId=$appId" -Session $session
  Add-Result -Test 'documents list authorized' -Status $r17.StatusCode -Outcome ($(if($r17.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "total=$($r17.Json.meta.total)"
} else {
  Add-Result -Test 'documents list authorized' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId missing from application response'
}

if ($docId) {
  $r18 = Invoke-Json -Method GET -Url "$base/api/documents/$docId" -Session $session
  Add-Result -Test 'documents detail by id' -Status $r18.StatusCode -Outcome ($(if($r18.StatusCode -eq 200){'PASS'}else{'FAIL'})) -Details "fileName=$($r18.Json.data.fileName)"
} else {
  Add-Result -Test 'documents detail by id' -Status 0 -Outcome 'FAIL' -Details 'Skipped: docId missing from document create response'
}

if ($docId) {
  $r19 = Invoke-Json -Method DELETE -Url "$base/api/documents/$docId" -Session $session
  $r20 = Invoke-Json -Method GET -Url "$base/api/documents/$docId" -Session $session
  Add-Result -Test 'documents delete flow' -Status $r19.StatusCode -Outcome ($(if($r19.StatusCode -eq 200 -and $r20.StatusCode -eq 404){'PASS'}else{'FAIL'})) -Details "deleteStatus=$($r19.StatusCode); afterDeleteGet=$($r20.StatusCode)"
} else {
  Add-Result -Test 'documents delete flow' -Status 0 -Outcome 'FAIL' -Details 'Skipped: docId missing from document create response'
}

if ($appId) {
  $r21 = Invoke-Json -Method DELETE -Url "$base/api/applications/$appId" -Session $session
  $r22 = Invoke-Json -Method GET -Url "$base/api/applications/$appId" -Session $session
  Add-Result -Test 'applications delete flow' -Status $r21.StatusCode -Outcome ($(if($r21.StatusCode -eq 200 -and $r22.StatusCode -eq 404){'PASS'}else{'FAIL'})) -Details "deleteStatus=$($r21.StatusCode); afterDeleteGet=$($r22.StatusCode)"
} else {
  Add-Result -Test 'applications delete flow' -Status 0 -Outcome 'FAIL' -Details 'Skipped: appId missing from create response'
}

$publicHealth = Invoke-Json -Method GET -Url "$base/api/universities?page=1&pageSize=1"
Add-Result -Test 'public api health snapshot' -Status $publicHealth.StatusCode -Outcome 'INFO' -Details "universitiesMetaTotal=$($publicHealth.Json.meta.total)"

$passCount = ($results | Where-Object { $_.Outcome -eq 'PASS' }).Count
$failCount = ($results | Where-Object { $_.Outcome -eq 'FAIL' }).Count

Write-Output '--- MANUAL API TEST RESULTS ---'
$results | Format-Table -AutoSize | Out-String | Write-Output
Write-Output "SUMMARY: PASS=$passCount FAIL=$failCount TOTAL=$($results.Count)"
if ($failCount -gt 0) { exit 1 }
