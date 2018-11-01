'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _sales = require('../db/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var validateSale = function validateSale(data) {
  // define the validation schema
  var schema = _joi2.default.object().keys({
    name: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    category: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    quantity: _joi2.default.number().integer().positive().greater(0).required(),
    size: _joi2.default.number().integer().positive().greater(0),
    price: _joi2.default.number().positive().greater(0).required(),
    userId: _joi2.default.number().positive().greater(0).required()
  });

  return _joi2.default.validate(data, schema);
};

var saleNotFound = function saleNotFound(res) {
  res.status(404).json({
    status: 'error',
    message: 'The Sale With the Given ID Was not Found.'
  });
};

var invalidDataMsg = function invalidDataMsg(res, error) {
  // send a 422 error response if validation fails
  res.status(422).json({
    status: 'error',
    message: 'Invalid request data',
    error: error.details[0].message
  });
};

var SalesController = function () {
  function SalesController() {
    _classCallCheck(this, SalesController);
  }

  _createClass(SalesController, [{
    key: 'getAllSales',
    value: function getAllSales(req, res) {
      res.status(200).send({
        success: 'true',
        message: 'Sales Retrieved Successfully',
        Sales: _sales2.default
      });
    }
  }, {
    key: 'getSale',
    value: function getSale(req, res) {
      var Sale = _sales2.default.find(function (sale) {
        return sale.id === parseInt(req.params.id, 10);
      });
      if (!Sale) {
        return res.status(404).json({
          status: 'error',
          message: 'The Sale with the given ID was not found.'
        });
      }
      res.status(200).send(Sale);
    }
  }, {
    key: 'createSales',
    value: function createSales(req, res) {
      // fetch the request data
      var data = req.body;
      var result = validateSale(data);

      if (result.error) {
        return invalidDataMsg(res, result.error);
      }
      var sale = {
        id: _sales2.default.length + 1,
        name: data.name.trim(),
        category: data.category.trim(),
        quantity: req.body.quantity,
        size: req.body.size,
        price: req.body.price,
        userId: req.body.userId
      };
      _sales2.default.push(sale);
      // send a success response if validation passes
      res.status(201).json({
        status: 'success',
        message: 'Sale Created Successfully',
        output: data
      });
    }
  }, {
    key: 'updateSales',
    value: function updateSales(req, res) {
      var id = parseInt(req.params.id, 10);
      var SaleFound = void 0;
      var SaleIndex = void 0;
      _sales2.default.map(function (Sale, index) {
        if (Sale.id === id) {
          SaleFound = Sale;
          SaleIndex = index;
        }
        return false;
      });

      if (!SaleFound) {
        return saleNotFound(res);
      }

      // fetch the request data
      var data = req.body;
      var result = validateSale(data);

      if (result.error) {
        return invalidDataMsg(res, result.error);
      }
      var updatedSale = {
        id: SaleFound.id,
        name: req.body.name.trim() || SaleFound.name,
        category: req.body.category.trim() || SaleFound.category,
        quantity: req.body.quantity || SaleFound.quantity,
        size: req.body.size || SaleFound.size,
        price: req.body.price || SaleFound.price,
        userId: req.body.userId || SaleFound.userId
      };

      _sales2.default.splice(SaleIndex, 1, updatedSale);

      return res.status(200).send({
        success: 'true',
        message: 'Sale Updated Successfully',
        updatedSale: updatedSale
      });
    }
  }, {
    key: 'deleteSale',
    value: function deleteSale(req, res) {
      var Sale = _sales2.default.find(function (sale) {
        return sale.id === parseInt(req.params.id, 10);
      });
      if (!Sale) {
        return res.status(404).json({
          status: 'error',
          message: 'The Sale with the given ID was not found.'
        });
      }

      var index = _sales2.default.indexOf(Sale);
      _sales2.default.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Sale Deleted Successfully'
      });
    }
  }]);

  return SalesController;
}();

var salesController = new SalesController();
exports.default = salesController;