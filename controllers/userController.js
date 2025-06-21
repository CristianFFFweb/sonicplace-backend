const pool = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
  try {
    const { email, password, fullName, phone } = req.body;

   
    if (!email || !password || !fullName) return res.status(400).json({ error: 'Faltan datos' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await pool.query(
      'INSERT INTO users (email, password, fullName, phone) VALUES ($1, $2, $3, $4) RETURNING id, email, fullName, phone',
      [email, hashedPassword, fullName, phone]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al registrar usuario' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);

    if (result.rows.length === 0) return res.status(401).json({ error: 'Usuario no encontrado' });

    const user = result.rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(401).json({ error: 'Contraseña incorrecta' });

    const token = jwt.sign(
  {
    id: user.id,
    email: user.email,
    username: user.username 
  },
  process.env.JWT_SECRET,
  { expiresIn: '2h' }
);

    res.json({ token, user: { id: user.id, email: user.email, fullName: user.fullname, phone: user.phone } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const getProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const result = await pool.query('SELECT id, email, fullName, phone FROM users WHERE id = $1', [userId]);

    if (result.rows.length === 0) return res.status(404).json({ error: 'Usuario no encontrado' });

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener perfil' });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query('SELECT id, fullname, email FROM users');
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  getAllUsers
};
