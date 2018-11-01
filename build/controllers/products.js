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

var validateProduct = function validateProduct(data) {
  // define the validation schema
  var schema = _joi2.default.object().keys({
    name: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    category: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    quantity: _joi2.default.number().integer().positive().greater(0).required(),
    size: _joi2.default.number().integer().positive().greater(0),
    price: _joi2.default.number().positive().greater(0).required()
  });

  return _joi2.default.validate(data, schema);
};

var productNotFound = function productNotFound(res) {
  res.status(404).json({
    status: 'error',
    message: 'The Product With the Given ID Was not Found.'
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

var ProductsController = function () {
  function ProductsController() {
    _classCallCheck(this, ProductsController);
  }

  _createClass(ProductsController, [{
    key: 'getAllProducts',
    value: function getAllProducts(req, res) {
      res.status(200).send({
        success: 'true',
        message: 'Products Retrieved Successfully',
        products: _products2.default
      });
    }
  }, {
    key: 'getProduct',
    value: function getProduct(req, res) {
      var Product = _products2.default.find(function (product) {
        return product.id === parseInt(req.params.id, 10);
      });
      if (!Product) {
        return productNotFound(res);
      }
      res.status(200).send({
        success: 'true',
        message: 'Product Retrieved Successfully',
        Product: Product
      });
    }
  }, {
    key: 'createProduct',
    value: function createProduct(req, res) {
      // fetch the request data
      var data = req.body;
      var result = validateProduct(data);

      if (result.error) {
        return invalidDataMsg(res, result.error);
      }
      var product = {
        id: _products2.default.length + 1,
        name: data.name.trim(),
        category: data.category.trim(),
        quantity: req.body.quantity,
        size: req.body.size,
        price: req.body.price
      };
      _products2.default.push(product);
      // send a success response if validation passes
      res.status(201).json({
        status: 'success',
        message: 'Product Created Successfully',
        output: data
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
        return productNotFound(res);
      }

      // fetch the request data
      var data = req.body;
      var result = validateProduct(data);

      if (result.error) {
        return invalidDataMsg(res, result.error);
      }
      var updatedproduct = {
        id: productFound.id,
        name: req.body.name.trim() || productFound.name,
        category: req.body.category.trim() || productFound.category,
        quantity: req.body.quantity || productFound.quantity,
        size: req.body.size || productFound.size,
        price: req.body.price || productFound.price
      };
      _products2.default.splice(productIndex, 1, updatedproduct);
      return res.status(200).send({
        success: 'true',
        message: 'Product Updated Successfully',
        updatedproduct: updatedproduct
      });
    }
  }, {
    key: 'deleteProduct',
    value: function deleteProduct(req, res) {
      var Product = _products2.default.find(function (product) {
        return product.id === parseInt(req.params.id, 10);
      });
      if (!Product) {
        return productNotFound(res);
      }
      var index = _products2.default.indexOf(Product);
      _products2.default.splice(index, 1);
      return res.status(200).send({
        success: 'true',
        message: 'Product Deleted Successfully'
      });
    }
  }]);

  return ProductsController;
}();

var productController = new ProductsController();
exports.default = productController;