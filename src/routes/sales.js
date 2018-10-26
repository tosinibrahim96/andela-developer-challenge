import express from 'express';
import saleController from '../controllers/sales';

const router = express.Router();

// get all sales
router.get('/api/v1/sales/', saleController.getAllSales);

// add a sale
router.post('/api/v1/sales/', saleController.createSales);

// get a single sale
router.get('/api/v1/sales/:id', saleController.getSale);

// update a sale
router.put('/api/v1/sales/:id', saleController.updateSales);


// delete a sale
router.delete('/api/v1/sales/:id', saleController.deleteSale);

module.exports = router;
