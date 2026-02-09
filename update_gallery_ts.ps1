$galleryPath = "d:\SinggaOfficial\public\assets\Gallery"
$tsFilePath = "d:\SinggaOfficial\src\app\pages\gallery\gallery.ts"

# Get all image files
$images = Get-ChildItem -Path $galleryPath -File | Where-Object { $_.Extension -match "\.(jpg|jpeg|png|gif|webp)$" } | Select-Object -ExpandProperty Name

# Format as TypeScript array
$tsArray = "    allImages: string[] = [`n"
$count = 0
foreach ($img in $images) {
    $tsArray += "        `"$img`""
    if ($count -lt $images.Count - 1) {
        $tsArray += ","
    }
    $tsArray += "`n"
    $count++
}
$tsArray += "    ];"

# Read existing TS file
$content = Get-Content -Path $tsFilePath -Raw

# Regex to find existing allImages array
# Matches "allImages: string[] = [ ... ];" considering multiline content
$pattern = "allImages:\s*string\[\]\s*=\s*\[[\s\S]*?\];"

if ($content -match $pattern) {
    # Replace with new array
    $newContent = $content -replace $pattern, $tsArray
    Set-Content -Path $tsFilePath -Value $newContent
    Write-Host "Successfully updated gallery.ts with $($images.Count) images."
}
else {
    Write-Error "Could not find 'allImages' array in $tsFilePath"
}
