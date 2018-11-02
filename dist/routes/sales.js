'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Sales = require('../controllers/Sales');

var _Sales2 = _interopRequireDefault(_Sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// get all sales
router.get('/api/v1/sales/', _Sales2.default.getAllSales);

// add a sale
router.post('/api/v1/sales/', _Sales2.default.createSales);

// get a single sale
router.get('/api/v1/sales/:id', _Sales2.default.getSale);

// update a sale
router.put('/api/v1/sales/:id', _Sales2.default.updateSales);

// delete a sale
router.delete('/api/v1/sales/:id', _Sales2.default.deleteSale);

module.exports = router;