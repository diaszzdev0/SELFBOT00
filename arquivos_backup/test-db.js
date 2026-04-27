const { Pool } = require('pg');
require('dotenv').config();

async function testConnection() {
  console.log('🔍 Testando conexão com Neon...\n');

  if (!process.env.DATABASE_URL) {
    console.error('❌ DATABASE_URL não configurada no arquivo .env');
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }
  });

  try {
    const client = await pool.connect();
    console.log('✅ Conexão estabelecida com sucesso!');

    const result = await client.query('SELECT version()');
    console.log('📊 Versão do PostgreSQL:', result.rows[0].version);

    const tables = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `);

    console.log('\n📋 Tabelas encontradas:');
    if (tables.rows.length === 0) {
      console.log('  (nenhuma tabela - execute npm start para criar)');
    } else {
      tables.rows.forEach(row => console.log(`  - ${row.table_name}`));
    }

    client.release();
    await pool.end();
    console.log('\n✅ Teste concluído!');
  } catch (err) {
    console.error('❌ Erro na conexão:', err.message);
    process.exit(1);
  }
}

testConnection();
