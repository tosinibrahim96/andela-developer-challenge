'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _db = require('../models/db');

var _db2 = _interopRequireDefault(_db);

var _Helper = require('./Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var User = {
  /**
    * Create A User
    * @param {object} req
    * @param {object} res
    * @returns {object} reflection object
    */
  create: function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
      var hashPassword, createQuery, values, _ref2, rows, token;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              if (!(!req.body.email || !req.body.password)) {
                _context.next = 2;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'Some values are missing' }));

            case 2:
              if (_Helper2.default.isValidEmail(req.body.email)) {
                _context.next = 4;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'Please enter a valid email address' }));

            case 4:
              hashPassword = _Helper2.default.hashPassword(req.body.password);
              createQuery = 'INSERT INTO\n      users(id, email, password, )\n      VALUES($1, $2, $3, $4, $5)\n      returning *';
              values = [1, req.body.email, hashPassword];
              _context.prev = 7;
              _context.next = 10;
              return _db2.default.query(createQuery, values);

            case 10:
              _ref2 = _context.sent;
              rows = _ref2.rows;
              token = _Helper2.default.generateToken(rows[0].id);
              return _context.abrupt('return', res.status(201).send({ token: token }));

            case 16:
              _context.prev = 16;
              _context.t0 = _context['catch'](7);

              if (!(_context.t0.routine === '_bt_check_unique')) {
                _context.next = 20;
                break;
              }

              return _context.abrupt('return', res.status(400).send({ message: 'User with that EMAIL already exist' }));

            case 20:
              return _context.abrupt('return', res.status(400).send(_context.t0));

            case 21:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, this, [[7, 16]]);
    }));

    function create(_x, _x2) {
      return _ref.apply(this, arguments);
    }

    return create;
  }()
};

exports.default = User;