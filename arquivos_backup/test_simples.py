# -*- coding: utf-8 -*-
"""
Script de Teste - Cloud SelfBot
Testa as correcoes aplicadas
"""

import re
import sys

# Configurar encoding para UTF-8
if sys.platform == 'win32':
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout.buffer, 'strict')

def test_regex_patterns():
    """Testa os padroes de regex do comando pg/pago"""
    
    print("=" * 60)
    print("TESTANDO PADROES DE COMANDO")
    print("=" * 60)
    
    # Padrao correto (novo)
    pattern = r"^(pg|pago)\s+\S+"
    
    test_cases = [
        # (input, should_match)
        ("pg Joao", True),
        ("pago Maria", True),
        ("pg Joao Silva", True),
        ("pago Maria Santos", True),
        ("PG JOAO", True),
        ("PAGO MARIA", True),
        ("Pg Joao", True),
        ("Pago Maria", True),
        ("pg", False),
        ("pago", False),
        ("pagamento Joao", False),
        ("joao pg", False),
        ("pg  ", False),
        ("  pg Joao", False),
        ("pg Joao Silva Santos", True),
    ]
    
    passed = 0
    failed = 0
    
    for test_input, should_match in test_cases:
        matches = bool(re.match(pattern, test_input.strip(), re.IGNORECASE))
        status = "[OK]" if matches == should_match else "[FALHOU]"
        
        if matches == should_match:
            passed += 1
        else:
            failed += 1
        
        expected = "DEVE ACEITAR" if should_match else "DEVE REJEITAR"
        result = "ACEITO" if matches else "REJEITADO"
        
        print(f"{status} '{test_input}' -> {expected} -> {result}")
    
    print("\n" + "=" * 60)
    print(f"RESULTADO: {passed} passou, {failed} falhou")
    print("=" * 60)
    
    return failed == 0


def test_name_extraction():
    """Testa a extracao do nome do comando"""
    
    print("\n" + "=" * 60)
    print("TESTANDO EXTRACAO DE NOME")
    print("=" * 60)
    
    test_cases = [
        ("pg Joao", "Joao"),
        ("pago Maria", "Maria"),
        ("pg Joao Silva", "Joao Silva"),
        ("pago Maria Santos Silva", "Maria Santos Silva"),
        ("PG JOAO", "JOAO"),
        ("Pago Maria da Silva", "Maria da Silva"),
    ]
    
    passed = 0
    failed = 0
    
    for test_input, expected_name in test_cases:
        parts = test_input.strip().split(maxsplit=1)
        if len(parts) >= 2:
            extracted_name = parts[1].strip()
            matches = extracted_name == expected_name
            status = "[OK]" if matches else "[FALHOU]"
            
            if matches:
                passed += 1
            else:
                failed += 1
            
            print(f"{status} '{test_input}' -> Esperado: '{expected_name}' -> Extraido: '{extracted_name}'")
        else:
            print(f"[FALHOU] '{test_input}' -> Erro: nao foi possivel extrair nome")
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"RESULTADO: {passed} passou, {failed} falhou")
    print("=" * 60)
    
    return failed == 0


def main():
    print("\n")
    print("=" * 60)
    print("     TESTE DE CORRECOES - CLOUD SELFBOT")
    print("=" * 60)
    print("\n")
    
    all_passed = True
    
    # Teste 1: Padroes de comando
    if not test_regex_patterns():
        all_passed = False
    
    # Teste 2: Extracao de nome
    if not test_name_extraction():
        all_passed = False
    
    # Resultado final
    print("\n" + "=" * 60)
    if all_passed:
        print("[SUCESSO] TODOS OS TESTES PASSARAM!")
        print("O bot esta pronto para uso!")
    else:
        print("[ERRO] ALGUNS TESTES FALHARAM!")
        print("Verifique as correcoes antes de fazer deploy")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
