'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _products = require('../controllers/products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get all products
router.get('/api/v1/products/', _products2.default.getAllProducts);

// add a product
router.post('/api/v1/products/', _products2.default.createProduct);

// get a single product
router.get('/api/v1/products/:id', _products2.default.getProduct);

// update a product
router.put('/api/v1/products/:id', _products2.default.updateProduct);

// delete a product
router.delete('/api/v1/products/:id', _products2.default.deleteProduct);

module.exports = router;