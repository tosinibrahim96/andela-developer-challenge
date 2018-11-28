import express from 'express';
import categoryController from '../controllers/Categories';
import Auth from '../middleware/Auth';

const router = express.Router();

// get all categories
router.get('/api/v1/categories/', Auth.verifyToken, categoryController.getAllCategories);

// get a categories
router.get('/api/v1/categories/:id', Auth.verifyToken, categoryController.getCategory);

// add a category
router.post('/api/v1/categories/', Auth.verifyToken, categoryController.create);

// update a category
router.put('/api/v1/categories/:id', Auth.verifyToken, categoryController.updateCategory);


// delete a category
router.delete('/api/v1/categories/:id', Auth.verifyToken, categoryController.deleteCategory);

module.exports = router;
