'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

_dotenv2.default.config();

var Helper = function () {
  function Helper() {
    _classCallCheck(this, Helper);
  }

  _createClass(Helper, null, [{
    key: 'hashPassword',

    /**
     * Hash Password Method
     */
    value: function hashPassword(password) {
      return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(7));
    }

    /**
     * comparePassword
     */

  }, {
    key: 'comparePassword',
    value: function comparePassword(hashPassword, password) {
      return _bcrypt2.default.compareSync(password, hashPassword);
    }

    /**
     * isValidEmail helper method
     */

  }, {
    key: 'isValidEmail',
    value: function isValidEmail(email) {
      var schema = _joi2.default.object().keys({
        email: _joi2.default.string().email().required()
      });

      return _joi2.default.validate(email, schema);
    }

    /**
     * Gnerate Token
     */

  }, {
    key: 'generateToken',
    value: function generateToken(id, role) {
      var token = _jsonwebtoken2.default.sign({
        userId: id,
        userRole: role
      }, process.env.SECRET, { expiresIn: '7d' });
      return token;
    }
  }, {
    key: 'validateProduct',
    value: function validateProduct(data) {
      // define the validation schema
      var schema = _joi2.default.object().keys({
        name: _joi2.default.string().required(),
        category_id: _joi2.default.number().required(),
        price: _joi2.default.number().min(1).required(),
        quantity: _joi2.default.number().min(1).required(),
        description: _joi2.default.string().required()
      });

      return _joi2.default.validate(data, schema);
    }
  }, {
    key: 'productNotFound',
    value: function productNotFound(res) {
      res.status(404).json({
        status: 'error',
        message: 'The Product With the Given ID Was not Found.'
      });
    }
  }, {
    key: 'invalidDataMsg',
    value: function invalidDataMsg(res, error) {
      // send a 422 error response if validation fails
      res.status(422).json({
        status: 'error',
        message: 'Invalid request data',
        error: error.details[0].message
      });
    }
  }]);

  return Helper;
}();

exports.default = Helper;