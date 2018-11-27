'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _User = require('../controllers/User');

var _User2 = _interopRequireDefault(_User);

var _Auth = require('../middleware/Auth');

var _Auth2 = _interopRequireDefault(_Auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const router = _express2.default.Router();

// get all users
router.get('/api/v1/users', _Auth2.default.verifyToken, _User2.default.getAllUsers);

//delete a user
router.delete('/api/v1/users/:id', _Auth2.default.verifyToken, _User2.default.deleteUser);

// add a user
router.post('/api/v1/auth/signup', _Auth2.default.verifyToken, _User2.default.create);

// login a user
router.post('/api/v1/auth/login', _User2.default.login);

module.exports = router;