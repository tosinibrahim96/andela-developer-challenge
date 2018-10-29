'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _products = require('../db/products');

var _products2 = _interopRequireDefault(_products);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var ProductsController = function () {
  function ProductsController() {
    _classCallCheck(this, ProductsController);
  }

  _createClass(ProductsController, [{
    key: 'getAllProducts',
    value: function getAllProducts(req, res) {
      res.status(200).send({
        success: 'true',
        message: 'products retrieved successfully',
        products: _products2.default
      });
    }
  }, {
    key: 'getProduct',
    value: function getProduct(req, res) {
      var product = _products2.default.find(function (p) {
        return p.id === parseInt(req.params.id, 10);
      });
      if (!product) {
        return res.status(404).json({
          status: 'error',
          message: 'The product with the given ID was not found.'
        });
      }
      res.status(200).send(product);
    }
  }, {
    key: 'createProduct',
    value: function createProduct(req, res) {
      // fetch the request data
      var data = req.body;

      // define the validation schema
      var schema = _joi2.default.object().keys({
        name: _joi2.default.string().required(),
        category: _joi2.default.string().required(),
        quantity: _joi2.default.number().integer().positive().greater(0).required(),
        size: _joi2.default.number().integer().positive().greater(0),
        price: _joi2.default.number().positive().greater(0).required()
      });

      // validate the request data against the schema
      _joi2.default.validate(data, schema, function (err) {
        if (err) {
          // send a 422 error response if validation fails
          res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: data,
            error: err.details[0].message
          });
        } else if (typeof req.body.name === 'number' || typeof req.body.category === 'number') {
          // send a 422 error response if  string is not entered for name and category
          res.status(422).json({
            status: 'error',
            message: 'Invalid data type for name or category',
            data: data
          });
        } else {
          // If the input is not empty string
          var product = {
            id: _products2.default.length + 1,
            name: req.body.name.trim(),
            category: req.body.category.trim(),
            quantity: req.body.quantity,
            size: req.body.size,
            price: req.body.price
          };
          _products2.default.push(product);
          // send a success response if validation passes
          res.status(201).json({
            status: 'success',
            message: 'Product created successfully',
            output: data
          });
        }
      });
    }
  }, {
    key: 'updateProduct',
    value: function updateProduct(req, res) {
      var id = parseInt(req.params.id, 10);
      var productFound = void 0;
      var productIndex = void 0;
      _products2.default.map(function (product, index) {
        if (product.id === id) {
          productFound = product;
          productIndex = index;
        }
        return false;
      });

      if (!productFound) {
        return res.status(404).send({
          success: 'false',
          message: 'product not found'
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
        price: _joi2.default.number().positive().greater(0).required()
      });

      // validate the request data against the schema
      _joi2.default.validate(data, schema, function (err) {
        if (err) {
          // send a 422 error response if validation fails
          res.status(422).json({
            status: 'error',
            message: 'Invalid request data',
            data: data,
            error: err.details[0].message
          });
        } else if (typeof req.body.name === 'number' || typeof req.body.category === 'number') {
          // send a 422 error response if  string is not entered for name and category
          res.status(422).json({
            status: 'error',
            message: 'Invalid data type',
            data: data
          });
        } else {
          var updatedproduct = {
            id: productFound.id,
            name: req.body.name.trim() || productFound.name,
            category: req.body.category.trim() || productFound.category,
            quantity: req.body.quantity || productFound.quantity,
            size: req.body.size || productFound.size,
            price: req.body.price || productFound.price
          };

          _products2.default.splice(productIndex, 1, updatedproduct);

          return res.status(201).send({
            success: 'true',
            message: 'product updated successfully',
            updatedproduct: updatedproduct
          });
        }
      });
    }
  }, {
    key: 'deleteProduct',
    value: function deleteProduct(req, res) {
      var product = _products2.default.find(function (p) {
        return p.id === parseInt(req.params.id, 10);
      });
      if (!product) return res.status(404).send('The product with the given ID was not found.');

      var index = _products2.default.indexOf(product);
      _products2.default.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Product Deleted Successfully',
        data: product
      });
    }
  }]);

  return ProductsController;
}();

var productController = new ProductsController();
exports.default = productController;