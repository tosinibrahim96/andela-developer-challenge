'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Products = require('../controllers/Products');

var _Products2 = _interopRequireDefault(_Products);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// get all products
router.get('/api/v1/products/', _Products2.default.getAllProducts);

// add a product
router.post('/api/v1/products/', _Auth2.default.verifyToken, _Products2.default.createProduct);

// get a single product
router.get('/api/v1/products/:id', _Products2.default.getProduct);

// update a product
router.put('/api/v1/products/:id', _Auth2.default.verifyToken, _Products2.default.updateProduct);

// delete a product
router.delete('/api/v1/products/:id', _Auth2.default.verifyToken, _Products2.default.deleteProduct);

module.exports = router;