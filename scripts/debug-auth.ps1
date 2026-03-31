$ErrorActionPreference = 'Stop'
$base = 'http://localhost:3000'
$email = "manual.debug.$(Get-Date -Format 'yyyyMMddHHmmss')@example.com"
$pass = 'TestPass!12345'

$signupBody = @{ fullName = 'Debug User'; email = $email; password = $pass } | ConvertTo-Json
$signupResp = Invoke-WebRequest -UseBasicParsing -Method POST -Uri "$base/api/auth/sign-up" -ContentType 'application/json' -Body $signupBody
Write-Output "SIGNUP_STATUS=$($signupResp.StatusCode)"

$ws = New-Object Microsoft.PowerShell.Commands.WebRequestSession
$csrfResp = Invoke-WebRequest -UseBasicParsing -Method GET -Uri "$base/api/auth/csrf" -WebSession $ws
$csrf = ($csrfResp.Content | ConvertFrom-Json).csrfToken
Write-Output "CSRF_LEN=$($csrf.Length)"

$form = "csrfToken=$csrf&email=$email&password=$pass&callbackUrl=$base%2F&json=true"

try {
  $loginResp = Invoke-WebRequest -UseBasicParsing -Method POST -Uri "$base/api/auth/callback/credentials" -WebSession $ws -ContentType 'application/x-www-form-urlencoded' -Body $form -MaximumRedirection 0
  Write-Output "LOGIN_STATUS=$($loginResp.StatusCode)"
  Write-Output "LOGIN_LOCATION=$($loginResp.Headers.Location)"
} catch {
  if ($_.Exception.Response) {
    $lr = $_.Exception.Response
    Write-Output "LOGIN_STATUS=$([int]$lr.StatusCode)"
    Write-Output "LOGIN_LOCATION=$($lr.Headers['Location'])"
  } else {
    throw
  }
}

$cookies = $ws.Cookies.GetCookies($base)
Write-Output "COOKIE_COUNT=$($cookies.Count)"
foreach ($cookie in $cookies) {
  Write-Output "COOKIE=$($cookie.Name)"
}

try {
  $meResp = Invoke-WebRequest -UseBasicParsing -Method GET -Uri "$base/api/auth/me" -WebSession $ws
  Write-Output "ME_STATUS=$($meResp.StatusCode)"
  Write-Output "ME_BODY=$($meResp.Content)"
} catch {
  if ($_.Exception.Response) {
    $mr = $_.Exception.Response
    $stream = $mr.GetResponseStream()
    $reader = New-Object System.IO.StreamReader($stream)
    $content = $reader.ReadToEnd()
    $reader.Close()
    Write-Output "ME_STATUS=$([int]$mr.StatusCode)"
    Write-Output "ME_BODY=$content"
  } else {
    throw
  }
}
