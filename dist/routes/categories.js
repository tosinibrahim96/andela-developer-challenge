'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Categories = require('../controllers/Categories');

var _Categories2 = _interopRequireDefault(_Categories);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// get all categories
router.get('/api/v1/categories/', _Auth2.default.verifyToken, _Categories2.default.getAllCategories);

// get a categories
router.get('/api/v1/categories/:id', _Auth2.default.verifyToken, _Categories2.default.getCategory);

// add a category
router.post('/api/v1/categories/', _Auth2.default.verifyToken, _Categories2.default.create);

// update a category
router.put('/api/v1/categories/:id', _Auth2.default.verifyToken, _Categories2.default.updateCategory);

// delete a category
router.delete('/api/v1/categories/:id', _Auth2.default.verifyToken, _Categories2.default.deleteCategory);

module.exports = router;