import express from 'express';
import productController from '../controllers/Products';
import Auth from '../middleware/Auth';

const router = express.Router();

// get all products
router.get('/api/v1/products/', productController.getAllProducts);

// add a product
router.post('/api/v1/products/', Auth.verifyToken, productController.createProduct);

// get a single product
router.get('/api/v1/products/:id', productController.getProduct);

// update a product
router.put('/api/v1/products/:id', Auth.verifyToken, productController.updateProduct);


// delete a product
router.delete('/api/v1/products/:id', Auth.verifyToken, productController.deleteProduct);

module.exports = router;
