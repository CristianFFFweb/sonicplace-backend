const pool = require('../config/db');

const getPublicacionesPorUsuario = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query('SELECT * FROM products WHERE user_id = $1', [id]);
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener publicaciones del usuario:', error);
    res.status(500).json({ error: 'Error al obtener publicaciones del usuario' });
  }
};

const deleteUserYProductos = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM products WHERE user_id = $1', [id]);
    await pool.query('DELETE FROM users WHERE id = $1', [id]);
    res.json({ message: 'Usuario y productos eliminados' });
  } catch (error) {
    console.error('Error al eliminar usuario:', error);
    res.status(500).json({ error: 'Error al eliminar usuario y productos' });
  }
};

const deleteDestacadoByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM destacados WHERE id = $1', [id]);
    res.json({ message: 'Destacado eliminado' });
  } catch (error) {
    console.error('Error al eliminar destacado:', error);
    res.status(500).json({ error: 'Error al eliminar destacado' });
  }
};

const deleteOfertaByAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM ofertas WHERE id = $1', [id]);
    res.json({ message: 'Oferta eliminada' });
  } catch (error) {
    console.error('Error al eliminar oferta:', error);
    res.status(500).json({ error: 'Error al eliminar oferta' });
  }
};

module.exports = {
  getPublicacionesPorUsuario,
  deleteUserYProductos,
  deleteDestacadoByAdmin,
  deleteOfertaByAdmin
};
