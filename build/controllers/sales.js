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

var SalesController = function () {
  function SalesController() {
    _classCallCheck(this, SalesController);
  }

  _createClass(SalesController, [{
    key: 'getAllSales',
    value: function getAllSales(req, res) {
      res.status(200).send({
        success: 'true',
        message: 'Sales retrieved successfully',
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

      // define the validation schema
      var schema = _joi2.default.object().keys({
        name: _joi2.default.string().required(),
        category: _joi2.default.string().required(),
        quantity: _joi2.default.number().integer().positive().greater(0).required(),
        size: _joi2.default.number().integer().positive().greater(0),
        price: _joi2.default.number().positive().greater(0).required(),
        userId: _joi2.default.number().positive().greater(0).required()
      });

      // validate the request data against the schema
      _joi2.default.validate(data, schema, function (err) {
        if (err) {
          // send a 422 error response if validation fails
          res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            error: err.details[0].message
          });
        } else if (typeof req.body.name === 'number' || typeof req.body.category === 'number') {
          // send a 422 error response if  string is not entered for name and category
          res.status(422).json({
            status: 'error',
            message: 'Invalid data type for Name or Category'
          });
        } else {
          // If the input is not empty string
          var Sale = {
            id: _sales2.default.length + 1,
            name: req.body.name.trim(),
            category: req.body.category.trim(),
            quantity: req.body.quantity,
            size: req.body.size,
            price: req.body.price,
            userId: req.body.userId
          };
          _sales2.default.push(Sale);
          // send a success response if validation passes
          res.status(201).json({
            status: 'success',
            message: 'Sale created successfully',
            output: data
          });
        }
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
        return res.status(404).send({
          success: 'false',
          message: 'Sale not found'
        });
      }

      // fetch the request data
      var data = req.body;

      // define the validation schema
      var schema = _joi2.default.object().keys({
        name: _joi2.default.string().required(),
        category: _joi2.default.string().required(),
        quantity: _joi2.default.number().integer().positive().greater(0).required(),
        size: _joi2.default.number().integer().positive().greater(0),
        price: _joi2.default.number().positive().greater(0).required(),
        userId: _joi2.default.number().positive().greater(0).required()
      });

      // validate the request data against the schema
      _joi2.default.validate(data, schema, function (err) {
        if (err) {
          // send a 422 error response if validation fails
          res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            error: err.details[0].message
          });
        } else if (typeof req.body.name === 'number' || typeof req.body.category === 'number') {
          // send a 422 error response if  string is not entered for name and category
          res.status(422).json({
            status: 'error',
            message: 'Invalid data type'
          });
        } else {
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

          return res.status(201).send({
            success: 'true',
            message: 'Sale updated successfully',
            updatedSale: updatedSale
          });
        }
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