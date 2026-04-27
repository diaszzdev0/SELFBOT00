@echo off
chcp 65001 >nul
echo.
echo ========================================
echo   Criando ZIP para SquareCloud
echo ========================================
echo.

cd /d "c:\Users\Usuario\Desktop\ultima tentativa"

echo Compactando arquivos...
powershell Compress-Archive -Path squarecloud.config,server.js,package.json,painel.html,cliente.html,README.md -DestinationPath "c:\Users\Usuario\Desktop\CloudSelfBot-SquareCloud.zip" -Force

echo.
echo ✓ ZIP criado com sucesso!
echo.
echo Local: c:\Users\Usuario\Desktop\CloudSelfBot-SquareCloud.zip
echo.
echo Proximos passos:
echo 1. Acesse: https://squarecloud.app/
echo 2. Faca login
echo 3. Clique em Nova Aplicacao
echo 4. Faca upload do ZIP
echo 5. Aguarde o deploy
echo.
echo URLs apos deploy:
echo   Admin:   https://cloudselfbot.squarecloud.app/
echo   Cliente: https://cloudselfbot.squarecloud.app/cliente
echo.

explorer.exe /select,"c:\Users\Usuario\Desktop\CloudSelfBot-SquareCloud.zip"

pause
