[System.Console]::OutputEncoding = [System.Text.Encoding]::UTF8
[System.Console]::InputEncoding = [System.Text.Encoding]::UTF8

$cachePath = Join-Path -Path $PSScriptRoot -ChildPath '.cache'
if (-not (Test-Path -Path $cachePath))
{
    New-Item -Path $cachePath -ItemType Directory | Out-Null
}

$packageJsonPath = Join-Path -Path $PSScriptRoot -ChildPath package.json
if (-not (Test-Path -Path $packageJsonPath))
{
    Write-Error "File not found: $packageJsonPath"
    return
}
$packageJson = Get-Content $packageJsonPath | ConvertFrom-Json
$extensions = $packageJson.extensionPack

$marketplaceUrl = 'https://marketplace.visualstudio.com/items?itemName={0}'
$baseBadgeUrl = 'https://img.shields.io'
$marketplaceVersionBadge = '![Visual Studio Marketplace Version]({0}/visual-studio-marketplace/v/{1}?style=flat-square)'
$marketplaceDownloadBadge = '![Visual Studio Marketplace Downloads]({0}/visual-studio-marketplace/d/{1}?style=flat-square)'
$marketplaceInstallsBadge = '![Visual Studio Marketplace Installs]({0}/visual-studio-marketplace/i/{1}?style=flat-square)'
$sb = [System.Text.StringBuilder]::new()
foreach ($extension in $extensions)
{
    Write-Host "Processing $extension"
    $extensionJsonCachePath = Join-Path -Path $cachePath -ChildPath "$extension.json"
    $updateCache = $false
    if (Test-Path -Path $extensionJsonCachePath)
    {
        $lastWriteTime = (Get-Item -Path $extensionJsonCachePath).LastWriteTime
        $updateCache = ((Get-Date) - $lastWriteTime).TotalDays -gt 1
    }
    else
    {
        $updateCache = $true
    }

    $extensionDetails = $null
    if (-not $updateCache)
    {
        Write-Host "Using cached data for $extension"
        $extensionDetails = Get-Content -Path $extensionJsonCachePath | ConvertFrom-Json
    }
    else
    {
        Write-Host "Updating cache for $extension"
        $extensionDetailsJson = vsce show --json $extension
        Set-Content -Path $extensionJsonCachePath -Value $extensionDetailsJson -Encoding UTF8
        $extensionDetails = $extensionDetailsJson | ConvertFrom-Json
    }

    $extensionUrl = $marketplaceUrl -f $extension
    $extensionDownloadBadge = $marketplaceDownloadBadge -f $baseBadgeUrl, $extension
    $extensionInstallsBadge = $marketplaceInstallsBadge -f $baseBadgeUrl, $extension
    $extensionVersionBadge = $marketplaceVersionBadge -f $baseBadgeUrl, $extension

    $sb.Append('| ') | Out-Null
    $sb.Append("[$($extensionDetails.displayName)]($extensionUrl)") | Out-Null
    $sb.Append(' | ') | Out-Null
    $sb.Append($extensionDetails.shortDescription) | Out-Null
    $sb.Append(' | ') | Out-Null
    $sb.Append($extensionVersionBadge) | Out-Null
    $sb.Append(' | ') | Out-Null
    $sb.Append($extensionDownloadBadge) | Out-Null
    $sb.Append(' | ') | Out-Null
    $sb.Append($extensionInstallsBadge) | Out-Null
    $sb.Append(' | ') | Out-Null
    $sb.Append($extensionDetails.lastUpdated.ToShortDateString()) | Out-Null
    $sb.Append(' |') | Out-Null
    $sb.AppendLine() | Out-Null
}

$templatePath = Join-Path -Path $PSScriptRoot -ChildPath README.template.md
if (-not (Test-Path -Path $templatePath))
{
    Write-Error "File not found: $templatePath"
    return
}
$template = Get-Content -Path $templatePath
$template = $template -replace '<!-- EXTENSIONS -->', $sb.ToString()

$readmePath = Join-Path -Path $PSScriptRoot -ChildPath README.md
Set-Content -Path $readmePath -Value $template -Encoding UTF8

Write-Host 'Generated README.md'
