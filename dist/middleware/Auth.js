'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _jsonwebtoken = require('jsonwebtoken');

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Auth = function () {
  function Auth() {
    _classCallCheck(this, Auth);
  }

  _createClass(Auth, null, [{
    key: 'verifyToken',

    /**
      * Verify Token
      and do the next thing
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res, next) {
        var headerToken, decodedToken, text, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                headerToken = req.headers.token;

                if (headerToken) {
                  _context.next = 3;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ message: 'Token is not provided' }));

              case 3:
                _context.prev = 3;
                _context.next = 6;
                return _jsonwebtoken2.default.verify(headerToken, process.env.SECRET);

              case 6:
                decodedToken = _context.sent;
                text = 'SELECT * FROM users WHERE id = $1';
                _context.next = 10;
                return _conn2.default.query(text, [decodedToken.userId]);

              case 10:
                _ref2 = _context.sent;
                rows = _ref2.rows;

                if (rows[0]) {
                  _context.next = 14;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ message: 'The token you provided is invalid' }));

              case 14:
                req.user = { id: decodedToken.userId, role: decodedToken.userRole };
                next();
                _context.next = 21;
                break;

              case 18:
                _context.prev = 18;
                _context.t0 = _context['catch'](3);
                return _context.abrupt('return', res.status(400).send(_context.t0));

              case 21:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[3, 18]]);
      }));

      function verifyToken(_x, _x2, _x3) {
        return _ref.apply(this, arguments);
      }

      return verifyToken;
    }()
  }]);

  return Auth;
}();

exports.default = Auth;