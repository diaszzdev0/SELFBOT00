import os
from dotenv import load_dotenv

load_dotenv()

print("=" * 60)
print("VERIFICACAO DE CONFIGURACOES DO BOT")
print("=" * 60)

# Verificar variáveis essenciais
configs = {
    "DISCORD_TOKEN": os.getenv("DISCORD_TOKEN"),
    "SERVER_ID": os.getenv("SERVER_ID"),
    "CATEGORY_ID": os.getenv("CATEGORY_ID"),
    "EMAIL_USER": os.getenv("EMAIL_USER"),
    "EMAIL_PASS": os.getenv("EMAIL_PASS"),
    "IMAP_SERVER": os.getenv("IMAP_SERVER"),
    "THREAD_MESSAGE": os.getenv("THREAD_MESSAGE"),
    "THREAD_IMAGE": os.getenv("THREAD_IMAGE"),
}

problemas = []

for key, value in configs.items():
    if not value or value in ["seu_token_aqui", "id_do_servidor", "id_da_categoria", "seu_email@gmail.com", "sua_senha_de_app_de_16_digitos"]:
        print(f"[X] {key}: NAO CONFIGURADO")
        problemas.append(key)
    else:
        # Ocultar valores sensíveis
        if key in ["DISCORD_TOKEN", "EMAIL_PASS"]:
            display = value[:10] + "..." if len(value) > 10 else "***"
        else:
            display = value[:50] + "..." if len(value) > 50 else value
        print(f"[OK] {key}: {display}")

print("=" * 60)

if problemas:
    print(f"\nATENCAO: {len(problemas)} configuracao(oes) faltando:")
    for p in problemas:
        print(f"   - {p}")
    print("\nConfigure o arquivo .env antes de executar o bot!")
else:
    print("\nTodas as configuracoes estao OK!")
    print("Voce pode executar: python bot.py")

print("=" * 60)
