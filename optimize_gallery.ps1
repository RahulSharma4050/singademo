$targetDir = "d:\SinggaOfficial\public\assets\Gallery"
$jsonPath = "d:\SinggaOfficial\public\assets\gallery-data.json"
$maxDimension = 1000

Add-Type -AssemblyName System.Drawing

Write-Host "Target Directory: $targetDir"

$files = Get-ChildItem -Path $targetDir -File | Where-Object { $_.Extension -match '\.jpe?g|\.png' }
$imageList = @()

foreach ($file in $files) {
    Write-Host "Processing $($file.Name)..."
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        $needsSave = $false
        
        # 1. Handle Orientation
        if ($img.PropertyIdList -contains 274) {
            $orient = $img.GetPropertyItem(274).Value[0]
            if ($orient -gt 1) {
                switch ($orient) {
                    2 { $img.RotateFlip("RotateNoneFlipX") }
                    3 { $img.RotateFlip("Rotate180FlipNone") }
                    4 { $img.RotateFlip("Rotate180FlipX") }
                    5 { $img.RotateFlip("Rotate90FlipX") }
                    6 { $img.RotateFlip("Rotate90FlipNone") }
                    7 { $img.RotateFlip("Rotate270FlipX") }
                    8 { $img.RotateFlip("Rotate270FlipNone") }
                }
                $img.RemovePropertyItem(274)
                $needsSave = $true
                Write-Host "  - Corrected orientation."
            }
        }

        # 2. Resize if too large
        $newWidth = $img.Width
        $newHeight = $img.Height

        if ($img.Width -gt $maxDimension -or $img.Height -gt $maxDimension) {
            $ratio = $img.Width / $img.Height
            if ($ratio -gt 1) {
                # Landscape
                $newWidth = $maxDimension
                $newHeight = [int]($maxDimension / $ratio)
            }
            else {
                # Portrait or Square
                $newHeight = $maxDimension
                $newWidth = [int]($maxDimension * $ratio)
            }
            $needsSave = $true
            Write-Host "  - Resizing to $newWidth x $newHeight"
        }

        if ($needsSave) {
            $newImg = New-Object System.Drawing.Bitmap($newWidth, $newHeight)
            $graphics = [System.Drawing.Graphics]::FromImage($newImg)
            $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
            $graphics.DrawImage($img, 0, 0, $newWidth, $newHeight)
            
            $img.Dispose() # Release file lock
            
            $savePath = $file.FullName
            $newImg.Save($savePath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            
            $newImg.Dispose()
            $graphics.Dispose()
        }
        else {
            $img.Dispose()
        }

        $imageList += $file.Name
    }
    catch {
        Write-Warning "Failed to process $($file.Name): $_"
        if ($img) { $img.Dispose() }
    }
}

# Generate JSON
$jsonContent = @{
    images      = $imageList
    generatedAt = (Get-Date).ToString("yyyy-MM-ddTHH:mm:ssZ")
    count       = $imageList.Count
} | ConvertTo-Json

$jsonContent | Set-Content -Path $jsonPath
Write-Host "Updated $jsonPath with $($imageList.Count) images."
