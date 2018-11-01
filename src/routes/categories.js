import express from 'express';
import categoryController from '../controllers/Categories';
import Auth from '../middleware/Auth';

const router = express.Router();

// get all categories
router.get('/api/v1/categories/', Auth.verifyToken, categoryController.getAllCategories);

// add a category
router.post('/api/v1/categories/', Auth.verifyToken, categoryController.create);

module.exports = router;
