const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../middlewares/upload');


router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);

router.post('/', upload.single('imagen'), productController.createProduct);
router.post('/', productController.createProduct);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);
router.patch('/:id', productController.updateProduct);


module.exports = router;
