'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _Categories = require('../controllers/Categories');

var _Categories2 = _interopRequireDefault(_Categories);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

// get all categories
router.get('/api/v1/categories/', _Auth2.default.verifyToken, _Categories2.default.getAllCategories);

// add a category
router.post('/api/v1/categories/', _Auth2.default.verifyToken, _Categories2.default.create);

module.exports = router;