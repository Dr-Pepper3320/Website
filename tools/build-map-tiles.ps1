param(
  [string]$Source = "",
  [string]$Output = "assets/map-tiles",
  [int]$TileSize = 512,
  [int64]$JpegQuality = 82
)

$workspace = Resolve-Path (Join-Path $PSScriptRoot "..")

if ([string]::IsNullOrWhiteSpace($Source)) {
  $candidates = @(
    "assets/worldmap.jfif",
    "assets/worldmap.jpg",
    "assets/worldmap.jpeg",
    "assets/worldmap.png"
  )
  $Source = $candidates | Where-Object { Test-Path (Join-Path $workspace $_) } | Select-Object -First 1

  if (-not $Source) {
    throw "No world map found. Expected assets/worldmap.jfif, .jpg, .jpeg, or .png."
  }
}

$sourcePath = Resolve-Path (Join-Path $workspace $Source)
$outputPath = Join-Path $workspace $Output

New-Item -ItemType Directory -Force -Path $outputPath | Out-Null
foreach ($pattern in @("tile_*.jpg", "metadata.json")) {
  Get-ChildItem -LiteralPath $outputPath -File -Filter $pattern -ErrorAction SilentlyContinue |
    ForEach-Object { Remove-Item -LiteralPath $_.FullName -Force }
}

Add-Type -AssemblyName System.Drawing

$sourceImage = [System.Drawing.Image]::FromFile($sourcePath)

try {
  $jpgCodec = [System.Drawing.Imaging.ImageCodecInfo]::GetImageEncoders() |
    Where-Object { $_.MimeType -eq "image/jpeg" }
  $qualityEncoder = [System.Drawing.Imaging.Encoder]::Quality
  $encoderParams = [System.Drawing.Imaging.EncoderParameters]::new(1)
  $encoderParams.Param[0] = [System.Drawing.Imaging.EncoderParameter]::new(
    $qualityEncoder,
    $JpegQuality
  )

  $columns = [Math]::Ceiling($sourceImage.Width / $TileSize)
  $rows = [Math]::Ceiling($sourceImage.Height / $TileSize)

  for ($row = 0; $row -lt $rows; $row++) {
    for ($col = 0; $col -lt $columns; $col++) {
      $x = $col * $TileSize
      $y = $row * $TileSize
      $width = [Math]::Min($TileSize, $sourceImage.Width - $x)
      $height = [Math]::Min($TileSize, $sourceImage.Height - $y)

      $bitmap = [System.Drawing.Bitmap]::new(
        $width,
        $height,
        [System.Drawing.Imaging.PixelFormat]::Format24bppRgb
      )
      $graphics = [System.Drawing.Graphics]::FromImage($bitmap)

      try {
        $graphics.Clear([System.Drawing.Color]::Black)
        $graphics.DrawImage(
          $sourceImage,
          [System.Drawing.Rectangle]::new(0, 0, $width, $height),
          [System.Drawing.Rectangle]::new($x, $y, $width, $height),
          [System.Drawing.GraphicsUnit]::Pixel
        )

        $tilePath = Join-Path $outputPath ("tile_{0}_{1}.jpg" -f $col, $row)
        $bitmap.Save($tilePath, $jpgCodec, $encoderParams)
      } finally {
        $graphics.Dispose()
        $bitmap.Dispose()
      }
    }
  }

  [PSCustomObject]@{
    source = $Source
    width = $sourceImage.Width
    height = $sourceImage.Height
    tileSize = $TileSize
    columns = $columns
    rows = $rows
    extension = "jpg"
  } | ConvertTo-Json | Set-Content -LiteralPath (Join-Path $outputPath "metadata.json") -Encoding ASCII

  Write-Host "Generated $($columns * $rows) map tiles in $outputPath"
} finally {
  $sourceImage.Dispose()
}
