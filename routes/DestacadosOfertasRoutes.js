const express = require('express');
const router = express.Router();

const { getDestacados, getOfertas, getDestacadosById, getOfertasById, updateDestacados, updateOfertas, crearPublicacion, eliminarPublicacion } = require('../controllers/DestacadosOfertasController');
const verifyToken = require('../middlewares/authMiddleware');
const isAdmin = require('../middlewares/isAdmin');
const uploadPorTipo = require('../middlewares/uploadPorTipo');
router.delete('/:tipo/:id', verifyToken, isAdmin, eliminarPublicacion);
router.delete('/ofertas/:id', verifyToken, isAdmin, eliminarPublicacion);
router.delete('/destacados/:id', verifyToken, isAdmin, eliminarPublicacion);

router.post('/:tipo', verifyToken, isAdmin, uploadPorTipo, crearPublicacion);
router.get('/destacados', getDestacados);
router.get('/ofertas', getOfertas);
router.get('/destacados/:id', getDestacadosById);
router.get('/ofertas/:id', getOfertasById);
router.patch('/destacados/:id', updateDestacados);
router.patch('/ofertas/:id', updateOfertas);

module.exports = router;