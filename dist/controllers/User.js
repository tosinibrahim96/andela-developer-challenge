'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

var _Helper = require('../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var User = function () {
  function User() {
    _classCallCheck(this, User);
  }

  _createClass(User, null, [{
    key: 'create',

    /**
      * Create A User
      */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var userRole, email, emailObject, answer, hashPassword, createQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userRole = req.user.role;
                email = req.body.email;
                emailObject = { email: email };
                answer = _Helper2.default.isValidEmail(emailObject);

                if (!(userRole === 'admin')) {
                  _context.next = 26;
                  break;
                }

                if (!(!req.body.email || !req.body.password)) {
                  _context.next = 7;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ message: 'Some values are missing' }));

              case 7:
                if (!answer.error) {
                  _context.next = 10;
                  break;
                }

                res.status(400).send({ message: 'Please enter a valid email address' });
                return _context.abrupt('return');

              case 10:
                hashPassword = _Helper2.default.hashPassword(req.body.password);
                createQuery = 'INSERT INTO users (email,password,role) VALUES ($1, $2, $3) returning *';
                values = [req.body.email, hashPassword, 'attendant'];
                _context.prev = 13;
                _context.next = 16;
                return _conn2.default.query(createQuery, values);

              case 16:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({ rows: rows }));

              case 21:
                _context.prev = 21;
                _context.t0 = _context['catch'](13);

                if (!(_context.t0.routine === '_bt_check_unique')) {
                  _context.next = 25;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ message: 'User with that EMAIL already exist' }));

              case 25:
                console.log(res.status(400).send('error'));

              case 26:
                return _context.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 27:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[13, 21]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
    * Get all Users
    */

  }, {
    key: 'getAllUsers',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var userRole, findAllQuery, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                userRole = req.user.role;

                if (!(userRole === 'admin')) {
                  _context2.next = 14;
                  break;
                }

                findAllQuery = 'select * FROM users';
                _context2.prev = 3;
                _context2.next = 6;
                return _conn2.default.query(findAllQuery);

              case 6:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                return _context2.abrupt('return', res.status(201).send({ rows: rows }));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](3);
                return _context2.abrupt('return', res.status(400).send({ error: _context2.t0 }));

              case 14:
                return _context2.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 15:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[3, 11]]);
      }));

      function getAllUsers(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllUsers;
    }()

    /**
     * Login
     */

  }, {
    key: 'login',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res, next) {
        var email, emailObject, answer, text, _ref6, rows, token;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                email = req.body.email;
                emailObject = { email: email };
                answer = _Helper2.default.isValidEmail(emailObject);

                if (!(!req.body.email || !req.body.password)) {
                  _context3.next = 6;
                  break;
                }

                res.status(400).send({ message: 'Some values are missing' });
                return _context3.abrupt('return');

              case 6:
                if (!answer.error) {
                  _context3.next = 9;
                  break;
                }

                res.status(400).send({ message: 'Please enter a valid email address' });
                return _context3.abrupt('return');

              case 9:
                text = 'SELECT * FROM users WHERE email = $1';
                _context3.prev = 10;
                _context3.next = 13;
                return _conn2.default.query(text, [req.body.email]);

              case 13:
                _ref6 = _context3.sent;
                rows = _ref6.rows;

                if (rows[0]) {
                  _context3.next = 18;
                  break;
                }

                res.status(400).send({ message: 'The credentials you provided is incorrect' });
                return _context3.abrupt('return');

              case 18:
                if (_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
                  _context3.next = 21;
                  break;
                }

                res.status(400).send({ message: 'The credentials you provided is incorrect' });
                return _context3.abrupt('return');

              case 21:
                token = _Helper2.default.generateToken(rows[0].id, rows[0].role);

                res.status(200).send({
                  token: token,
                  message: 'Login Successful'
                });
                return _context3.abrupt('return', next());

              case 26:
                _context3.prev = 26;
                _context3.t0 = _context3['catch'](10);
                return _context3.abrupt('return', res.status(400).send(_context3.t0));

              case 29:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 26]]);
      }));

      function login(_x5, _x6, _x7) {
        return _ref5.apply(this, arguments);
      }

      return login;
    }()
  }]);

  return User;
}();

exports.default = User;