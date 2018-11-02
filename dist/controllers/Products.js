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

var Product = function () {
  function Product() {
    _classCallCheck(this, Product);
  }

  _createClass(Product, null, [{
    key: 'getAllProducts',

    /**
    * Get all Categories
    */
    value: function () {
      var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {
        var findAllQuery, _ref2, rows;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                findAllQuery = 'select * FROM products';
                _context.prev = 1;
                _context.next = 4;
                return _conn2.default.query(findAllQuery);

              case 4:
                _ref2 = _context.sent;
                rows = _ref2.rows;
                return _context.abrupt('return', res.status(200).send({ rows: rows }));

              case 9:
                _context.prev = 9;
                _context.t0 = _context['catch'](1);
                return _context.abrupt('return', res.status(400).send({ error: _context.t0 }));

              case 12:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[1, 9]]);
      }));

      function getAllProducts(_x, _x2) {
        return _ref.apply(this, arguments);
      }

      return getAllProducts;
    }()

    /**
     * Get A Product
     */

  }, {
    key: 'getProduct',
    value: function () {
      var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {
        var text, _ref4, rows;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                text = 'SELECT * FROM products WHERE id = $1';
                _context2.prev = 1;
                _context2.next = 4;
                return _conn2.default.query(text, [req.params.id]);

              case 4:
                _ref4 = _context2.sent;
                rows = _ref4.rows;

                if (rows[0]) {
                  _context2.next = 8;
                  break;
                }

                return _context2.abrupt('return', _Helper2.default.productNotFound(res));

              case 8:
                return _context2.abrupt('return', res.status(200).send(rows[0]));

              case 11:
                _context2.prev = 11;
                _context2.t0 = _context2['catch'](1);
                return _context2.abrupt('return', res.status(400).send(_context2.t0));

              case 14:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this, [[1, 11]]);
      }));

      function getProduct(_x3, _x4) {
        return _ref3.apply(this, arguments);
      }

      return getProduct;
    }()
  }, {
    key: 'createProduct',
    value: function () {
      var _ref5 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(req, res) {
        var userRole, data, result, checkCategory, catValues, createQuery, values, _ref6, rowCount, _ref7, rows;

        return regeneratorRuntime.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                userRole = req.user.role;
                // fetch the request data

                data = req.body;
                result = _Helper2.default.validateProduct(data);

                if (!(userRole === 'admin')) {
                  _context3.next = 28;
                  break;
                }

                if (!result.error) {
                  _context3.next = 6;
                  break;
                }

                return _context3.abrupt('return', _Helper2.default.invalidDataMsg(res, result.error));

              case 6:
                checkCategory = 'SELECT * FROM categories WHERE id =$1';
                catValues = [parseInt(req.body.category_id, 10)];
                createQuery = 'INSERT INTO products (name,cat_id,price,quantity,description) VALUES ($1,$2,$3,$4,$5) returning *';
                values = [req.body.name.trim(), parseInt(req.body.category_id, 10), req.body.price, req.body.quantity, req.body.description.trim()];
                _context3.prev = 10;
                _context3.next = 13;
                return _conn2.default.query(checkCategory, catValues);

              case 13:
                _ref6 = _context3.sent;
                rowCount = _ref6.rowCount;

                if (!(rowCount <= 0)) {
                  _context3.next = 18;
                  break;
                }

                res.status(400).send({ message: 'The category does not exist' });
                return _context3.abrupt('return');

              case 18:
                _context3.next = 20;
                return _conn2.default.query(createQuery, values);

              case 20:
                _ref7 = _context3.sent;
                rows = _ref7.rows;
                return _context3.abrupt('return', res.status(201).send({ rows: rows }));

              case 25:
                _context3.prev = 25;
                _context3.t0 = _context3['catch'](10);

                console.log(res.status(422).send(_context3.t0));

              case 28:
                return _context3.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 29:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this, [[10, 25]]);
      }));

      function createProduct(_x5, _x6) {
        return _ref5.apply(this, arguments);
      }

      return createProduct;
    }()
  }, {
    key: 'updateProduct',
    value: function () {
      var _ref8 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(req, res) {
        var userRole, data, result, findProduct, _updateProduct, _ref9, rows, values;

        return regeneratorRuntime.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                userRole = req.user.role;
                // fetch the request data

                data = req.body;
                result = _Helper2.default.validateProduct(data);

                if (!(userRole === 'admin')) {
                  _context4.next = 25;
                  break;
                }

                if (!result.error) {
                  _context4.next = 6;
                  break;
                }

                return _context4.abrupt('return', _Helper2.default.invalidDataMsg(res, result.error));

              case 6:
                findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
                _updateProduct = 'UPDATE products\n      SET name=$1,cat_id=$2,price=$3,quantity=$4,description=$5\n      WHERE id=$6';
                _context4.prev = 8;
                _context4.next = 11;
                return _conn2.default.query(findProduct, [req.params.id, parseInt(req.body.category_id, 10)]);

              case 11:
                _ref9 = _context4.sent;
                rows = _ref9.rows;

                if (rows[0]) {
                  _context4.next = 16;
                  break;
                }

                res.status(400).send({ message: 'The Product not in this category' });
                return _context4.abrupt('return');

              case 16:
                values = [req.body.name.trim() || rows[0].name, parseInt(req.body.category_id, 10) || rows[0].cat_id, req.body.price || rows[0].price, req.body.quantity || rows[0].quantity, req.body.description.trim() || rows[0].description, req.params.id];
                _context4.next = 19;
                return _conn2.default.query(_updateProduct, values);

              case 19:
                return _context4.abrupt('return', res.status(200).send({ Message: 'Product update successful' }));

              case 22:
                _context4.prev = 22;
                _context4.t0 = _context4['catch'](8);
                return _context4.abrupt('return', res.status(400).send(_context4.t0));

              case 25:
                return _context4.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 26:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this, [[8, 22]]);
      }));

      function updateProduct(_x7, _x8) {
        return _ref8.apply(this, arguments);
      }

      return updateProduct;
    }()
  }, {
    key: 'deleteProduct',
    value: function () {
      var _ref10 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5(req, res) {
        var userRole, data, result, findProduct, _deleteProduct, _ref11, rows, values;

        return regeneratorRuntime.wrap(function _callee5$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                userRole = req.user.role;
                // fetch the request data

                data = req.body;
                result = _Helper2.default.validateProduct(data);

                if (!(userRole === 'admin')) {
                  _context5.next = 25;
                  break;
                }

                if (!result.error) {
                  _context5.next = 6;
                  break;
                }

                return _context5.abrupt('return', _Helper2.default.invalidDataMsg(res, result.error));

              case 6:
                findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
                _deleteProduct = 'DELETE FROM products\n      WHERE id=$1';
                _context5.prev = 8;
                _context5.next = 11;
                return _conn2.default.query(findProduct, [req.params.id, parseInt(req.body.category_id, 10)]);

              case 11:
                _ref11 = _context5.sent;
                rows = _ref11.rows;

                if (rows[0]) {
                  _context5.next = 16;
                  break;
                }

                res.status(400).send({ message: 'The Product not in this category' });
                return _context5.abrupt('return');

              case 16:
                values = [req.params.id];
                _context5.next = 19;
                return _conn2.default.query(_deleteProduct, values);

              case 19:
                return _context5.abrupt('return', res.status(200).send({ Message: 'Product deleted successfuly' }));

              case 22:
                _context5.prev = 22;
                _context5.t0 = _context5['catch'](8);
                return _context5.abrupt('return', res.status(400).send(_context5.t0));

              case 25:
                return _context5.abrupt('return', res.status(401).send({ Message: 'Unauthorised Action' }));

              case 26:
              case 'end':
                return _context5.stop();
            }
          }
        }, _callee5, this, [[8, 22]]);
      }));

      function deleteProduct(_x9, _x10) {
        return _ref10.apply(this, arguments);
      }

      return deleteProduct;
    }()
  }]);

  return Product;
}();

exports.default = Product;