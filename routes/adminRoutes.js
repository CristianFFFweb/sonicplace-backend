const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController');

router.get('/users/:id/publicaciones', adminController.getPublicacionesPorUsuario);
router.delete('/users/:id', adminController.deleteUserYProductos);
router.delete('/destacados/:id', adminController.deleteDestacadoByAdmin);
router.delete('/ofertas/:id', adminController.deleteOfertaByAdmin);

module.exports = router;