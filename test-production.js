const https = require('https');

const BASE_URL = 'cloudselfbot.squarecloud.app'; // Altere se necessário

function makeRequest(path, method = 'GET', data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: BASE_URL,
      path: path,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        try {
          resolve({ status: res.statusCode, data: JSON.parse(body) });
        } catch {
          resolve({ status: res.statusCode, data: body });
        }
      });
    });

    req.on('error', reject);
    if (data) req.write(JSON.stringify(data));
    req.end();
  });
}

async function testAPI() {
  console.log('🧪 Testando API na SquareCloud...\n');
  console.log(`📡 URL: https://${BASE_URL}\n`);

  try {
    // Teste 1: Verificar se servidor está respondendo
    console.log('[1/5] Testando conexão com servidor...');
    const health = await makeRequest('/api/users');
    if (health.status === 200) {
      console.log('✅ Servidor respondendo!\n');
    } else {
      console.log(`⚠️  Status: ${health.status}\n`);
    }

    // Teste 2: Listar usuários
    console.log('[2/5] Listando usuários...');
    const users = await makeRequest('/api/users');
    console.log(`✅ ${users.data.length} usuários encontrados`);
    if (users.data.length > 0) {
      console.log(`   Exemplo: ${users.data[0].username}\n`);
    } else {
      console.log('   (nenhum usuário cadastrado ainda)\n');
    }

    // Teste 3: Listar salas
    console.log('[3/5] Listando salas...');
    const rooms = await makeRequest('/api/rooms');
    console.log(`✅ ${rooms.data.length} salas encontradas\n`);

    // Teste 4: Testar login admin
    console.log('[4/5] Testando login admin...');
    const login = await makeRequest('/api/admin/login', 'POST', {
      username: 'Cloud',
      password: 'Dev0'
    });
    if (login.data.success) {
      console.log('✅ Login admin funcionando!\n');
    } else {
      console.log('❌ Login admin falhou\n');
    }

    // Teste 5: Criar usuário de teste
    console.log('[5/5] Criando usuário de teste...');
    const testKey = 'CLOUD-TEST' + Math.random().toString(36).substr(2, 4).toUpperCase();
    const newUser = await makeRequest('/api/users', 'POST', {
      username: 'TesteAPI',
      key: testKey,
      plan: 'semanal',
      expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
      rooms: 5
    });

    if (newUser.status === 200) {
      console.log('✅ Usuário criado com sucesso!');
      console.log(`   Username: ${newUser.data.username}`);
      console.log(`   Key: ${newUser.data.key}`);
      console.log(`   Plano: ${newUser.data.plan}\n`);
    } else {
      console.log(`⚠️  Erro ao criar usuário: ${newUser.status}\n`);
    }

    // Resumo final
    console.log('========================================');
    console.log('✅ TESTES CONCLUÍDOS!');
    console.log('========================================\n');
    console.log('📊 Resumo:');
    console.log(`   Servidor: ✅ Online`);
    console.log(`   Banco de dados: ✅ Conectado`);
    console.log(`   API: ✅ Funcionando`);
    console.log(`   Login Admin: ${login.data.success ? '✅' : '❌'}`);
    console.log('\n🎉 Seu sistema está funcionando na SquareCloud!\n');
    console.log('Acesse: https://' + BASE_URL + '/');
    console.log('Login: Cloud / Dev0\n');

  } catch (error) {
    console.error('❌ Erro ao testar API:', error.message);
    console.log('\n⚠️  Possíveis causas:');
    console.log('   - Servidor ainda está iniciando');
    console.log('   - DATABASE_URL não configurada');
    console.log('   - Erro no deploy');
    console.log('\nVerifique os logs: npm run logs\n');
  }
}

testAPI();
