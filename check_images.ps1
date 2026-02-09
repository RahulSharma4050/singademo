Add-Type -AssemblyName System.Drawing
$dirs = @("d:/SinggaOfficial/public/assets/Homepage", "d:/SinggaOfficial/public/assets/Posters")

foreach ($dir in $dirs) {
    Write-Host "--- Scanning $dir ---"
    $files = Get-ChildItem -Path $dir -File | Where-Object { $_.Extension -match '\.jpe?g|\.png' }
    foreach ($file in $files) {
        try {
            $img = [System.Drawing.Image]::FromFile($file.FullName)
            $orient = 0
            if ($img.PropertyIdList -contains 274) {
                $orient = $img.GetPropertyItem(274).Value[0]
            }
            $name = $file.Name
            $w = $img.Width
            $h = $img.Height
            Write-Host "$name : $w x $h (Orientation: $orient)"
            $img.Dispose()
        }
        catch {
            Write-Host "Error processing $($file.Name)"
        }
    }
}
