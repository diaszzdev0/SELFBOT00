const { Pool } = require('pg');
require('dotenv').config();

async function verifyDeploy() {
  console.log('🔍 VERIFICANDO DEPLOY NA SQUARECLOUD...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // 1. Verificar tabelas
    console.log('📊 [1/4] Verificando Tabelas...\n');
    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public' 
      AND table_name IN ('admin_users', 'users', 'rooms')
      ORDER BY table_name
    `);

    if (tables.rows.length === 3) {
      console.log('   ✅ Todas as tabelas existem (admin_users, users, rooms)\n');
    } else {
      console.log('   ⚠️  Faltam tabelas! Encontradas:', tables.rows.length);
      console.log('   → O servidor pode não ter iniciado ainda\n');
    }

    // 2. Verificar dados
    console.log('📋 [2/4] Verificando Dados...\n');
    
    const adminCount = await client.query('SELECT COUNT(*) FROM admin_users');
    const userCount = await client.query('SELECT COUNT(*) FROM users');
    const roomCount = await client.query('SELECT COUNT(*) FROM rooms');

    console.log(`   Admin users: ${adminCount.rows[0].count}`);
    console.log(`   Users: ${userCount.rows[0].count}`);
    console.log(`   Rooms: ${roomCount.rows[0].count}\n`);

    // 3. Verificar conexões ativas
    console.log('🔌 [3/4] Verificando Conexões Ativas...\n');
    
    const connections = await client.query(`
      SELECT 
        application_name,
        client_addr,
        state,
        query_start
      FROM pg_stat_activity 
      WHERE datname = current_database()
      AND pid != pg_backend_pid()
      ORDER BY query_start DESC
    `);

    if (connections.rows.length > 0) {
      console.log(`   ✅ ${connections.rows.length} conexão(ões) ativa(s) detectada(s):`);
      connections.rows.forEach((conn, i) => {
        const app = conn.application_name || 'unknown';
        const state = conn.state || 'unknown';
        const time = conn.query_start ? new Date(conn.query_start).toLocaleString('pt-BR') : 'N/A';
        console.log(`   ${i + 1}. App: ${app} | Estado: ${state} | Última query: ${time}`);
      });
      console.log('\n   ✅ SERVIDOR SQUARECLOUD ESTÁ CONECTADO!\n');
    } else {
      console.log('   ⚠️  Nenhuma conexão externa detectada');
      console.log('   → O servidor pode estar desconectado ou reiniciando\n');
    }

    // 4. Verificar atividade recente (últimos 5 minutos)
    console.log('⏰ [4/4] Verificando Atividade Recente...\n');
    
    const recentUsers = await client.query(`
      SELECT username, created_at 
      FROM users 
      WHERE created_at > NOW() - INTERVAL '5 minutes'
      ORDER BY created_at DESC
    `);

    const recentRooms = await client.query(`
      SELECT room_id, created_at 
      FROM rooms 
      WHERE created_at > NOW() - INTERVAL '5 minutes'
      ORDER BY created_at DESC
    `);

    if (recentUsers.rows.length > 0 || recentRooms.rows.length > 0) {
      console.log('   ✅ Atividade detectada nos últimos 5 minutos:');
      if (recentUsers.rows.length > 0) {
        console.log(`   → ${recentUsers.rows.length} usuário(s) criado(s)`);
      }
      if (recentRooms.rows.length > 0) {
        console.log(`   → ${recentRooms.rows.length} sala(s) criada(s)`);
      }
      console.log('\n   ✅ DEPLOY FUNCIONANDO E ATIVO!\n');
    } else {
      console.log('   ℹ️  Nenhuma atividade nos últimos 5 minutos');
      console.log('   → Isso é normal se você ainda não testou o painel\n');
    }

    client.release();
    await pool.end();

    // Resultado final
    console.log('========================================');
    console.log('📊 RESULTADO DA VERIFICAÇÃO');
    console.log('========================================\n');

    const hasAllTables = tables.rows.length === 3;
    const hasConnections = connections.rows.length > 0;
    const hasActivity = recentUsers.rows.length > 0 || recentRooms.rows.length > 0;

    if (hasAllTables && hasConnections) {
      console.log('✅ STATUS: DEPLOY BEM-SUCEDIDO!\n');
      console.log('O servidor SquareCloud está:');
      console.log('  ✅ Conectado ao banco Neon');
      console.log('  ✅ Tabelas criadas corretamente');
      console.log('  ✅ Pronto para uso\n');
      
      if (hasActivity) {
        console.log('  ✅ Sistema já está sendo usado!\n');
      } else {
        console.log('💡 Próximo passo:');
        console.log('  1. Acesse o painel admin');
        console.log('  2. Faça login (Cloud/Dev0)');
        console.log('  3. Crie um usuário de teste\n');
      }
    } else if (hasAllTables && !hasConnections) {
      console.log('⚠️  STATUS: DEPLOY PARCIAL\n');
      console.log('As tabelas existem, mas não há conexões ativas.');
      console.log('Possíveis causas:');
      console.log('  - Servidor ainda está iniciando');
      console.log('  - Servidor parou ou teve erro');
      console.log('  - DATABASE_URL não configurada\n');
      console.log('Ação: Verifique os logs na SquareCloud\n');
    } else {
      console.log('❌ STATUS: DEPLOY INCOMPLETO\n');
      console.log('As tabelas não foram criadas.');
      console.log('Possíveis causas:');
      console.log('  - Servidor não iniciou ainda');
      console.log('  - Erro no código');
      console.log('  - DATABASE_URL incorreta\n');
      console.log('Ação: Verifique os logs na SquareCloud\n');
    }

  } catch (err) {
    console.error('❌ Erro ao verificar:', err.message);
    console.log('\nPossíveis causas:');
    console.log('  - DATABASE_URL incorreta');
    console.log('  - Banco Neon inacessível');
    console.log('  - Problema de rede\n');
    process.exit(1);
  }
}

verifyDeploy();
