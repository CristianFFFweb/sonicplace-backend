const pool = require('../config/db'); 
const path = require('path');
const upload = require('../middlewares/upload');

const getAllProducts = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM products');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener productos' });
  }
};


const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener producto' });
  }
};


const createProduct = async (req, res) => {
  try {
    console.log('BODY:', req.body);
    console.log('FILE:', req.file);
    const { nombre, descripcion, precio, vendedor, stock, estado, categoria } = req.body;
    console.log('Datos recibidos:', req.body);
    const imagen = req.file ? `/images/${req.file.filename}` : '';

    const userResult = await pool.query('SELECT id FROM users WHERE email = $1', [vendedor]);
    if (userResult.rows.length === 0) {
      return res.status(404).json({ message: 'Vendedor no encontrado' });
    }

    const userId = userResult.rows[0].id;

    const result = await pool.query(
      `INSERT INTO products (nombre, descripcion, precio, imagen, stock, estado, user_id, categoria)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
       RETURNING *`,
      [nombre, descripcion, precio, imagen, stock, estado, userId, categoria]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Error al crear producto:', error);
    res.status(500).json({ message: 'Error al crear el producto' });
  }
};



const updateProduct = async (req, res) => {
 
  const { id } = req.params;
  const { stock } = req.body;

  try {
    const result = await pool.query(
      'UPDATE catalogo SET stock = $1 WHERE id = $2 RETURNING *',
      [stock, id]
    );

    if (result.rowCount === 0) return res.status(404).json({ mensaje: 'Producto no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ mensaje: 'Error al actualizar stock' });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query('DELETE FROM products WHERE id = $1', [id]);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar producto' });
  }
};



module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
};