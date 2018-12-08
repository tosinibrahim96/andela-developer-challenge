import express from "express";
import saleController from "../controllers/sales";
import Auth from "../middleware/Auth";
const router = express.Router();

// get a single sale
router.get("/api/v1/sales/:id", Auth.verifyToken, saleController.getSale);

// get all sales
router.get("/api/v1/sales", Auth.verifyToken, saleController.getAllSales);

// add a sale
router.post("/api/v1/sales", Auth.verifyToken, saleController.createSales);

// // update a sale
// router.put('/api/v1/sales/:id', saleController.updateSales);

// delete a sale
router.delete("/api/v1/sales/:id", Auth.verifyToken, saleController.deleteSale);

module.exports = router;
