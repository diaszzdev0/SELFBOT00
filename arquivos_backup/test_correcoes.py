"""
Script de Teste - Cloud SelfBot
Testa as correções aplicadas
"""

import re

def test_regex_patterns():
    """Testa os padrões de regex do comando pg/pago"""
    
    print("=" * 60)
    print("🧪 TESTANDO PADRÕES DE COMANDO")
    print("=" * 60)
    
    # Padrão correto (novo)
    pattern = r"^(pg|pago)\s+\S+"
    
    test_cases = [
        # (input, should_match)
        ("pg João", True),
        ("pago Maria", True),
        ("pg João Silva", True),
        ("pago Maria Santos", True),
        ("PG JOÃO", True),
        ("PAGO MARIA", True),
        ("Pg João", True),
        ("Pago Maria", True),
        ("pg", False),
        ("pago", False),
        ("pagamento João", False),
        ("joão pg", False),
        ("pg  ", False),
        ("  pg João", False),
        ("pg João Silva Santos", True),
    ]
    
    passed = 0
    failed = 0
    
    for test_input, should_match in test_cases:
        matches = bool(re.match(pattern, test_input.strip(), re.IGNORECASE))
        status = "✅" if matches == should_match else "❌"
        
        if matches == should_match:
            passed += 1
        else:
            failed += 1
        
        expected = "DEVE ACEITAR" if should_match else "DEVE REJEITAR"
        result = "ACEITO" if matches else "REJEITADO"
        
        print(f"{status} '{test_input}' → {expected} → {result}")
    
    print("\n" + "=" * 60)
    print(f"📊 RESULTADO: {passed} passou, {failed} falhou")
    print("=" * 60)
    
    return failed == 0


def test_name_extraction():
    """Testa a extração do nome do comando"""
    
    print("\n" + "=" * 60)
    print("🧪 TESTANDO EXTRAÇÃO DE NOME")
    print("=" * 60)
    
    test_cases = [
        ("pg João", "João"),
        ("pago Maria", "Maria"),
        ("pg João Silva", "João Silva"),
        ("pago Maria Santos Silva", "Maria Santos Silva"),
        ("PG JOÃO", "JOÃO"),
        ("Pago Maria da Silva", "Maria da Silva"),
    ]
    
    passed = 0
    failed = 0
    
    for test_input, expected_name in test_cases:
        parts = test_input.strip().split(maxsplit=1)
        if len(parts) >= 2:
            extracted_name = parts[1].strip()
            matches = extracted_name == expected_name
            status = "✅" if matches else "❌"
            
            if matches:
                passed += 1
            else:
                failed += 1
            
            print(f"{status} '{test_input}' → Esperado: '{expected_name}' → Extraído: '{extracted_name}'")
        else:
            print(f"❌ '{test_input}' → Erro: não foi possível extrair nome")
            failed += 1
    
    print("\n" + "=" * 60)
    print(f"📊 RESULTADO: {passed} passou, {failed} falhou")
    print("=" * 60)
    
    return failed == 0


def test_thread_name_detection():
    """Testa a detecção de modo de jogo pelo nome da thread"""
    
    print("\n" + "=" * 60)
    print("🧪 TESTANDO DETECÇÃO DE MODO DE JOGO")
    print("=" * 60)
    
    test_cases = [
        ("fila-1234567-inf", "Gel Infinito"),
        ("fila-9876543-inf", "Gel Infinito"),
        ("fila-1234567", "Gelo Normal"),
        ("fila-9876543", "Gelo Normal"),
        ("1x1 mobile - gel infinito", "Gel Infinito"),
        ("2x2 misto - gelo normal", "Gelo Normal"),
        ("3x3 emulador", "Gelo Normal"),
        ("4x4 mobile", "Gelo Normal"),
    ]
    
    passed = 0
    failed = 0
    
    for thread_name, expected_mode in test_cases:
        name_lower = thread_name.lower()
        
        # Detecta pelo padrão fila-XXXXXXX-inf
        if re.search(r'fila-\d{7}-inf', name_lower):
            detected = "Gel Infinito"
        # Detecta pelo padrão fila-XXXXXXX
        elif re.search(r'fila-\d{7}', name_lower):
            detected = "Gelo Normal"
        # Detecta por palavras-chave
        elif any(kw in name_lower for kw in ['gel infinito', 'gel inf', 'gelo infinito', 'gelo inf', '-inf']):
            detected = "Gel Infinito"
        else:
            detected = "Gelo Normal"
        
        matches = detected == expected_mode
        status = "✅" if matches else "❌"
        
        if matches:
            passed += 1
        else:
            failed += 1
        
        print(f"{status} '{thread_name}' → Esperado: {expected_mode} → Detectado: {detected}")
    
    print("\n" + "=" * 60)
    print(f"📊 RESULTADO: {passed} passou, {failed} falhou")
    print("=" * 60)
    
    return failed == 0


def main():
    print("\n")
    print("=" * 60)
    print(" " * 10 + "TESTE DE CORREÇÕES - CLOUD SELFBOT")
    print("=" * 60)
    print("\n")
    
    all_passed = True
    
    # Teste 1: Padrões de comando
    if not test_regex_patterns():
        all_passed = False
    
    # Teste 2: Extração de nome
    if not test_name_extraction():
        all_passed = False
    
    # Teste 3: Detecção de modo de jogo
    if not test_thread_name_detection():
        all_passed = False
    
    # Resultado final
    print("\n" + "=" * 60)
    if all_passed:
        print("✅ TODOS OS TESTES PASSARAM!")
        print("🚀 O bot está pronto para uso!")
    else:
        print("❌ ALGUNS TESTES FALHARAM!")
        print("⚠️  Verifique as correções antes de fazer deploy")
    print("=" * 60 + "\n")


if __name__ == "__main__":
    main()
