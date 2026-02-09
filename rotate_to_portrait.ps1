Add-Type -AssemblyName System.Drawing
$dir = "d:/SinggaOfficial/public/assets/Homepage"
$files = Get-ChildItem -Path $dir -File -Filter "DSC*.JPG"

foreach ($file in $files) {
    try {
        $img = [System.Drawing.Image]::FromFile($file.FullName)
        if ($img.Width -gt $img.Height) {
            Write-Host "Rotating $($file.Name) 90 degrees clockwise..."
            # Using Rotate90FlipNone for 90 degree CW rotation
            $img.RotateFlip([System.Drawing.RotateFlipType]::Rotate90FlipNone)
            
            $curr_path = $file.FullName + ".tmp"
            $img.Save($curr_path, [System.Drawing.Imaging.ImageFormat]::Jpeg)
            $img.Dispose()
            
            if (Test-Path $curr_path) {
                Move-Item -Path $curr_path -Destination $file.FullName -Force
                Write-Host "Successfully rotated $($file.Name)."
            }
        }
        else {
            Write-Host "$($file.Name) is already portrait."
            $img.Dispose()
        }
    }
    catch {
        Write-Warning "Failed to rotate $($file.Name): $_"
        if ($img) { $img.Dispose() }
    }
}
