@echo off
echo ========================================
echo   Preparando Deploy para SquareCloud
echo ========================================
echo.

REM Criar pasta temporária
if exist deploy-temp rmdir /s /q deploy-temp
mkdir deploy-temp

echo [1/3] Copiando arquivos necessarios...

REM Copiar arquivos essenciais
copy server.js deploy-temp\ >nul
copy database.js deploy-temp\ >nul
copy package.json deploy-temp\ >nul
copy painel.html deploy-temp\ >nul
copy cliente.html deploy-temp\ >nul
copy squarecloud.config deploy-temp\ >nul
copy squarecloud.app deploy-temp\ >nul
copy .gitignore deploy-temp\ >nul

REM Copiar outros arquivos HTML/CSS/JS se existirem
if exist *.css copy *.css deploy-temp\ >nul
if exist *.js (
    for %%f in (*.js) do (
        if not "%%f"=="test-db.js" if not "%%f"=="migrate.js" if not "%%f"=="check-tables.js" (
            copy %%f deploy-temp\ >nul
        )
    )
)

echo [2/3] Criando arquivo ZIP...

REM Criar ZIP
powershell -command "Compress-Archive -Path deploy-temp\* -DestinationPath deploy-squarecloud.zip -Force"

echo [3/3] Limpando arquivos temporarios...

REM Limpar pasta temporária
rmdir /s /q deploy-temp

echo.
echo ========================================
echo   Deploy preparado com sucesso!
echo ========================================
echo.
echo Arquivo criado: deploy-squarecloud.zip
echo.
echo PROXIMOS PASSOS:
echo.
echo 1. Configure a variavel DATABASE_URL na SquareCloud:
echo    DATABASE_URL=postgresql://neondb_owner:npg_3RJa4bcMnUKm@ep-silent-cloud-anryyduw-pooler.c-6.us-east-1.aws.neon.tech/neondb?sslmode=require
echo.
echo 2. Faca upload do arquivo deploy-squarecloud.zip
echo.
echo 3. Reinicie a aplicacao
echo.
echo Veja DEPLOY_SQUARECLOUD.md para instrucoes detalhadas
echo.
pause
