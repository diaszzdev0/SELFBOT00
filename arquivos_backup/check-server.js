const { Pool } = require('pg');
require('dotenv').config();

async function checkServerStatus() {
  console.log('🔍 Verificando status do servidor na SquareCloud...\n');

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();

    // Verificar tabelas
    console.log('📊 Status do Banco de Dados:\n');
    
    const tables = ['admin_users', 'users', 'rooms'];
    
    for (const table of tables) {
      const result = await client.query(`SELECT COUNT(*) FROM ${table}`);
      const count = result.rows[0].count;
      console.log(`  ${table.padEnd(15)} → ${count} registros`);
    }

    // Verificar se há usuários criados recentemente
    console.log('\n📅 Atividade Recente:\n');
    
    const recentUsers = await client.query(`
      SELECT username, created_at 
      FROM users 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    if (recentUsers.rows.length > 0) {
      console.log('  Últimos usuários criados:');
      recentUsers.rows.forEach(user => {
        const date = new Date(user.created_at).toLocaleString('pt-BR');
        console.log(`    - ${user.username} (${date})`);
      });
    } else {
      console.log('  ⚠️  Nenhum usuário criado ainda');
    }

    const recentRooms = await client.query(`
      SELECT room_id, mode, created_at 
      FROM rooms 
      ORDER BY created_at DESC 
      LIMIT 5
    `);

    if (recentRooms.rows.length > 0) {
      console.log('\n  Últimas salas criadas:');
      recentRooms.rows.forEach(room => {
        const date = new Date(room.created_at).toLocaleString('pt-BR');
        console.log(`    - Sala ${room.room_id} (${room.mode}) - ${date}`);
      });
    } else {
      console.log('\n  ⚠️  Nenhuma sala criada ainda');
    }

    // Verificar conexões ativas
    console.log('\n🔌 Conexões ao Banco:\n');
    const connections = await client.query(`
      SELECT count(*) as total 
      FROM pg_stat_activity 
      WHERE datname = current_database()
    `);
    console.log(`  Total de conexões ativas: ${connections.rows[0].total}`);

    client.release();
    await pool.end();

    console.log('\n========================================');
    console.log('✅ VERIFICAÇÃO CONCLUÍDA!');
    console.log('========================================\n');

    console.log('📝 Próximos Passos:\n');
    console.log('1. Acesse o painel admin da sua aplicação');
    console.log('2. Faça login com: Cloud / Dev0');
    console.log('3. Crie um usuário de teste');
    console.log('4. Execute este script novamente para ver a atividade\n');

    console.log('💡 Dica: Se você criar um usuário no painel e ele');
    console.log('   aparecer aqui, significa que está tudo funcionando!\n');

  } catch (err) {
    console.error('❌ Erro:', err.message);
    process.exit(1);
  }
}

checkServerStatus();
