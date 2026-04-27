# 🚀 Guia de Deploy Rápido - SquareCloud

## Primeira Configuração (Fazer UMA VEZ)

1. Faça login na CLI:
```bash
squarecloud auth login
```

2. Cole seu API Token da SquareCloud (pegue em: https://squarecloud.app/dashboard/me)

## Deploy Rápido

### Opção 1: Terminal
```bash
npm run deploy
```

### Opção 2: Atalho VSCode
Pressione: **Ctrl + Shift + B**

### Opção 3: Comando direto
```bash
squarecloud commit
```

## Outros Comandos Úteis

Ver logs em tempo real:
```bash
npm run logs
```

Ver status da aplicação:
```bash
npm run status
```

Reiniciar aplicação:
```bash
squarecloud restart
```

## Dica
Após configurar o login, você só precisa usar `npm run deploy` ou `Ctrl+Shift+B` para atualizar!
