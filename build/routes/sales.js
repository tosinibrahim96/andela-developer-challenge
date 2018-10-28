'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _sales = require('../controllers/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get all sales
router.get('/api/v1/sales/', _sales2.default.getAllSales);

// add a sale
router.post('/api/v1/sales/', _sales2.default.createSales);

// get a single sale
router.get('/api/v1/sales/:id', _sales2.default.getSale);

// update a sale
router.put('/api/v1/sales/:id', _sales2.default.updateSales);

// delete a sale
router.delete('/api/v1/sales/:id', _sales2.default.deleteSale);

module.exports = router;