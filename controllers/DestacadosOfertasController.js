const pool = require('../config/db'); // tu conexión a PostgreSQL

// Obtener todos los destacados
const getDestacados = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM destacados');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener destacados:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener destacado por ID
const getDestacadosById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM destacados WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Destacado no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener destacado por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener oferta por ID
const getOfertasById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM ofertas WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Oferta no encontrada' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    console.error('Error al obtener oferta por ID:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener todas las ofertas
const getOfertas = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM ofertas');
    res.json(result.rows);
  } catch (error) {
    console.error('Error al obtener ofertas:', error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Actualizar stock de destacados
const updateDestacados = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const result = await pool.query(
      'UPDATE destacados SET stock = $1 WHERE id = $2 RETURNING *',
      [stock, id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ mensaje: 'Producto no encontrado' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar stock' });
  }
};

// Actualizar stock de ofertas
const updateOfertas = async (req, res) => {
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const result = await pool.query(
      'UPDATE ofertas SET stock = $1 WHERE id = $2 RETURNING *',
      [stock, id]
    );

    if (result.rowCount === 0)
      return res.status(404).json({ mensaje: 'Producto no encontrado' });

    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar stock' });
  }
};

// Crear publicación en 'ofertas' o 'destacados'
const crearPublicacion = async (req, res) => {
  const tipo = req.params.tipo; // viene desde la ruta /api/publicar/:tipo
  const { nombre, descripcion, precio, stock, estado, categoria, precio_anterior } = req.body;
  const imagen = req.file ? `/${tipo}/${req.file.filename}` : '';

  if (!['ofertas', 'destacados'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido. Debe ser "ofertas" o "destacados".' });
  }

  try {
    let query = '';
    let values = [];

    if (tipo === 'ofertas') {
      query = `
        INSERT INTO ofertas (nombre, descripcion, precio, imagen, stock, estado, categoria, precio_anterior)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *`;
      values = [nombre, descripcion, precio, imagen, stock, estado, categoria, precio_anterior];
    } else {
      query = `
        INSERT INTO destacados (nombre, descripcion, precio, imagen, stock, estado, categoria)
        VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`;
      values = [nombre, descripcion, precio, imagen, stock, estado, categoria];
    }

    const result = await pool.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear publicación:', error);
    res.status(500).json({ error: 'Error en el servidor al crear publicación' });
  }
};

// Eliminar publicación
const eliminarPublicacion = async (req, res) => {
  const { id } = req.params;
  const { tipo } = req.body;

  if (!['ofertas', 'destacados'].includes(tipo)) {
    return res.status(400).json({ error: 'Tipo inválido para eliminación.' });
  }

  try {
    const result = await pool.query(`DELETE FROM ${tipo} WHERE id = $1 RETURNING *`, [id]);
    if (result.rowCount === 0) {
      return res.status(404).json({ mensaje: 'Publicación no encontrada' });
    }
    res.json({ mensaje: `Publicación eliminada de ${tipo}`, eliminado: result.rows[0] });
  } catch (error) {
    console.error('Error al eliminar publicación:', error);
    res.status(500).json({ error: 'Error en el servidor al eliminar publicación' });
  }
};

const deleteOferta = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM ofertas WHERE id = $1', [id]);
    res.json({ message: 'Oferta eliminada' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar oferta' });
  }
};

const deleteDestacado = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM destacados WHERE id = $1', [id]);
    res.json({ message: 'Destacado eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar destacado' });
  }
};

module.exports = {
  getDestacados,
  getOfertas,
  getDestacadosById,
  getOfertasById,
  updateDestacados,
  updateOfertas,
  crearPublicacion,
  eliminarPublicacion,
  deleteOferta,
  deleteDestacado
};
