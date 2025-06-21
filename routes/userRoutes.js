const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getProfile, getAllUsers } = require('../controllers/userController');
const verifyToken = require('../middlewares/authMiddleware');
const { deleteUserAndProducts } = require('../controllers/productController');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', verifyToken, getProfile);
router.get('/', getAllUsers);
router.delete('/:id', deleteUserAndProducts);

module.exports = router;