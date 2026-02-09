$logoPath = "d:\SinggaOfficial\public\assets\Logo\Logo.jpg"
$targetWidth = 300

Add-Type -AssemblyName System.Drawing

Write-Host "Processing $logoPath..."

try {
    $img = [System.Drawing.Image]::FromFile($logoPath)
    Write-Host "Original dimensions: $($img.Width) x $($img.Height)"
    
    if ($img.Width -gt $targetWidth) {
        $ratio = $targetWidth / $img.Width
        $newHeight = [int]($img.Height * $ratio)
        
        Write-Host "Resizing to $targetWidth x $newHeight..."
        
        $newImg = New-Object System.Drawing.Bitmap($targetWidth, $newHeight)
        $graphics = [System.Drawing.Graphics]::FromImage($newImg)
        $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
        $graphics.DrawImage($img, 0, 0, $targetWidth, $newHeight)
        
        $img.Dispose() # Release file lock
        
        $newImg.Save($logoPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
        $newImg.Dispose()
        $graphics.Dispose()
        
        Write-Host "Successfully resized Logo.jpg"
    }
    else {
        Write-Host "Image is already small enough. Skipping."
        $img.Dispose()
    }
}
catch {
    Write-Error "Failed to resize logo: $_"
    if ($img) { $img.Dispose() }
}
