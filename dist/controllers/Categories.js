'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Category = function () {
  function Category() {
    _classCallCheck(this, Category);
  }

  _createClass(Category, null, [{
    key: 'create',

    /**
       * Create A Category
       */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var userRole, createQuery, values, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                userRole = req.user.role;

                if (!(userRole === 'admin')) {
                  _context.next = 17;
                  break;
                }

                if (req.body.name) {
                  _context.next = 4;
                  break;
                }

                return _context.abrupt('return', res.status(400).send({ message: 'Category name is missing' }));

              case 4:
                createQuery = 'INSERT INTO categories (name) VALUES ($1) returning *';
                values = [req.body.name];
                _context.prev = 6;
                _context.next = 9;
                return _conn2.default.query(createQuery, values);

              case 9:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(201).send({ rows: rows }));

              case 14:
                _context.prev = 14;
                _context.t0 = _context['catch'](6);

                console.log(res.status(400).send(_context.t0));

              case 17:
                return _context.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 18:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[6, 14]]);
      }));

      function create(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return create;
    }()

    /**
    * Get all Categories
    */

  }, {
    key: 'getAllCategories',
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

                findAllQuery = 'select * FROM categories';
                _context2.prev = 3;
                _context2.next = 6;
                return _conn2.default.query(findAllQuery);

              case 6:
                _ref4 = _context2.sent;
                rows = _ref4.rows;
                return _context2.abrupt('return', res.status(200).send({ rows: rows }));

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

      function getAllCategories(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getAllCategories;
    }()
  }]);

  return Category;
}();

exports.default = Category;