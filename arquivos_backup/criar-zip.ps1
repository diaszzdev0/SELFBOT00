# Script para criar ZIP para SquareCloud
Write-Host "📦 Criando arquivo ZIP para SquareCloud..." -ForegroundColor Cyan

$sourceFolder = "c:\Users\Usuario\Desktop\ultima tentativa"
$zipFile = "c:\Users\Usuario\Desktop\CloudSelfBot-SquareCloud.zip"

# Remove ZIP antigo se existir
if (Test-Path $zipFile) {
    Remove-Item $zipFile -Force
    Write-Host "🗑️  ZIP antigo removido" -ForegroundColor Yellow
}

# Arquivos que devem ser incluídos
$files = @(
    "squarecloud.config",
    "server.js",
    "package.json",
    "painel.html",
    "cliente.html",
    "README.md"
)

# Criar ZIP temporário
$tempFolder = "$env:TEMP\CloudSelfBot"
if (Test-Path $tempFolder) {
    Remove-Item $tempFolder -Recurse -Force
}
New-Item -ItemType Directory -Path $tempFolder | Out-Null

# Copiar arquivos
foreach ($file in $files) {
    $sourcePath = Join-Path $sourceFolder $file
    if (Test-Path $sourcePath) {
        Copy-Item $sourcePath $tempFolder
        Write-Host "✅ $file copiado" -ForegroundColor Green
    } else {
        Write-Host "⚠️  $file não encontrado" -ForegroundColor Red
    }
}

# Criar ZIP
Compress-Archive -Path "$tempFolder\*" -DestinationPath $zipFile -Force

# Limpar pasta temporária
Remove-Item $tempFolder -Recurse -Force

Write-Host ""
Write-Host "✅ ZIP criado com sucesso!" -ForegroundColor Green
Write-Host "📍 Local: $zipFile" -ForegroundColor Cyan
Write-Host ""
Write-Host "🚀 Próximos passos:" -ForegroundColor Yellow
Write-Host "1. Acesse: https://squarecloud.app/" -ForegroundColor White
Write-Host "2. Faca login" -ForegroundColor White
Write-Host "3. Clique em Nova Aplicacao" -ForegroundColor White
Write-Host "4. Faca upload do arquivo ZIP" -ForegroundColor White
Write-Host "5. Aguarde o deploy" -ForegroundColor White
Write-Host ""
Write-Host "📊 URLs após deploy:" -ForegroundColor Cyan
Write-Host "   Admin:   https://cloudselfbot.squarecloud.app/" -ForegroundColor Green
Write-Host "   Cliente: https://cloudselfbot.squarecloud.app/cliente" -ForegroundColor Green
Write-Host ""

# Abrir pasta onde está o ZIP
explorer.exe /select,"$zipFile"
