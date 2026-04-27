@echo off
chcp 65001 >nul
echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║     🚀 ATUALIZADOR AUTOMÁTICO - SQUARECLOUD               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

echo [1/3] 📦 Criando pacote atualizado...
powershell -Command "Compress-Archive -Path 'server.js','bot.py','package.json','package-lock.json','requirements.txt','squarecloud.config','start.sh','database.js','data-manager.js','client-db-functions.js','painel.html','cliente.html','migrate.js','.npmrc' -DestinationPath 'deploy-squarecloud-atualizado.zip' -Force"

if %errorlevel% neq 0 (
    echo ❌ Erro ao criar ZIP
    pause
    exit /b 1
)

echo ✅ Arquivo criado: deploy-squarecloud-atualizado.zip
echo.

echo [2/3] 🌐 Abrindo SquareCloud Dashboard...
start https://squarecloud.app/dashboard/upload

echo.
echo [3/3] 📋 INSTRUÇÕES:
echo.
echo 1. Faça login na SquareCloud
echo 2. Selecione sua aplicação: Cloud SelfBot Manager
echo 3. Clique em "Commit" ou "Upload"
echo 4. Selecione o arquivo: deploy-squarecloud-atualizado.zip
echo 5. Aguarde o upload e reinicie a aplicação
echo.
echo ⚠️  NÃO ESQUEÇA de configurar as variáveis de ambiente!
echo.

echo 📂 Abrindo pasta do arquivo...
explorer /select,"deploy-squarecloud-atualizado.zip"

echo.
echo ✅ Processo concluído!
echo.
pause
