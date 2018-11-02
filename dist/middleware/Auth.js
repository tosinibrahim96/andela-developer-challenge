'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Auth {
  /**
    * Verify Token
    and do the next thing
    */
  static async verifyToken(req, res, next) {
    const headerToken = req.headers.token;
    if (!headerToken) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decodedToken = await _jsonwebtoken2.default.verify(headerToken, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await _conn2.default.query(text, [decodedToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decodedToken.userId, role: decodedToken.userRole };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

exports.default = Auth;