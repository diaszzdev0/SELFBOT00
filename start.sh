#!/bin/bash
echo "📦 Instalando dependências Node.js..."
npm install --production

echo "📦 Instalando dependências Python..."
pip install -r requirements.txt

echo "🤖 Iniciando bot Python em background..."
python bot.py &

echo "🚀 Iniciando servidor Node.js..."
node server.js
