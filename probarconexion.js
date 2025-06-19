const pool = require('./config/db');

(async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('Conexión exitosa:', result.rows[0]);
  } catch (error) {
    console.error('❌ Error al conectar:', error.message);
  }
})();
