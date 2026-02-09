$max_height = 1000 # Targeting 1000px height for portraits
$dirs = @(
    "d:/SinggaOfficial/public/assets/Homepage",
    "d:/SinggaOfficial/public/assets/Posters"
)

Add-Type -AssemblyName System.Drawing

function Rotate-Image {
    param($img, $orientation)
    switch ($orientation) {
        2 { $img.RotateFlip([System.Drawing.RotateFlipType]::RotateNoneFlipX) }
        3 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180None) }
        4 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate180FlipX) }
        5 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipX) }
        6 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90None) }
        7 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270FlipX) }
        8 { $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate270None) }
    }
}

foreach ($dir in $dirs) {
    Write-Host "Processing directory: $dir"
    $files = Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -match '\.jpe?g|\.png' }
    foreach ($file in $files) {
        Write-Host "Processing $($file.Name)..."
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            
            # Handle Orientation
            if ($img.PropertyIdList -contains 274) {
                $orient = $img.GetPropertyItem(274).Value[0]
                if ($orient -gt 1) {
                    Write-Host "Rotating $($file.Name) (Orientation: $orient)..."
                    Rotate-Image $img $orient
                    # Remove the orientation property to prevent double rotation in apps
                    $img.RemovePropertyItem(274)
                }
            }

            if ($img.Height -gt $max_height) {
                Write-Host "Resizing $($file.Name) to $($max_height)px height..."
                $new_height = $max_height
                $new_width = [int]($img.Width * ($new_height / $img.Height))
                
                $new_img = New-Object System.Drawing.Bitmap($new_width, $new_height)
                $graphics = [System.Drawing.Graphics]::FromImage($new_img)
                $graphics.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
                $graphics.DrawImage($img, 0, 0, $new_width, $new_height)
                
                $img.Dispose()
                
                $new_img.Save($file.FullName, [System.Drawing.Imaging.ImageFormat]::Jpeg)
                $new_img.Dispose()
                $graphics.Dispose()
                Write-Host "Successfully processed $($file.Name)."
            }
            else {
                # Even if not resizing, we might have rotated it
                Write-Host "Saving $($file.Name) (updated rotation)..."
                $curr_path = $file.FullName + ".tmp"
                $img.Save($curr_path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
                $img.Dispose()
                Move-Item -Path $curr_path -Destination $file.FullName -Force
            }
        }
        catch {
            Write-Warning "Failed to process $($file.Name): $_"
            if ($img) { $img.Dispose() }
        }
    }
}
