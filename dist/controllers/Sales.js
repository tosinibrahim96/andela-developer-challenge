'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _sales = require('../db/sales');

var _sales2 = _interopRequireDefault(_sales);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const validateSale = data => {
  // define the validation schema
  const schema = _joi2.default.object().keys({
    name: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    category: _joi2.default.string().regex(/^[A-Za-z ]+$/).required(),
    quantity: _joi2.default.number().integer().positive().greater(0).required(),
    size: _joi2.default.number().integer().positive().greater(0),
    price: _joi2.default.number().positive().greater(0).required(),
    userId: _joi2.default.number().positive().greater(0).required()
  });

  return _joi2.default.validate(data, schema);
};

const saleNotFound = res => {
  res.status(404).json({
    status: 'error',
    message: 'The Sale With the Given ID Was not Found.'
  });
};

const invalidDataMsg = (res, error) => {
  // send a 422 error response if validation fails
  res.status(422).json({
    status: 'error',
    message: 'Invalid request data',
    error: error.details[0].message
  });
};

class SalesController {
  static getAllSales(req, res) {
    return res.status(200).send({
      success: 'true',
      message: 'Sales Retrieved Successfully',
      Sales: _sales2.default
    });
  }

  static getSale(req, res) {
    const Sale = _sales2.default.find(sale => sale.id === parseInt(req.params.id, 10));
    if (!Sale) {
      return res.status(404).json({
        status: 'error',
        message: 'The Sale with the given ID was not found.'
      });
    }
    res.status(200).send(Sale);
  }

  static createSales(req, res) {
    // fetch the request data
    const data = req.body;
    const result = validateSale(data);

    if (result.error) {
      return invalidDataMsg(res, result.error);
    }
    const sale = {
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

  static updateSales(req, res) {
    const id = parseInt(req.params.id, 10);
    let SaleFound;
    let SaleIndex;
    _sales2.default.map((Sale, index) => {
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
    const data = req.body;
    const result = validateSale(data);

    if (result.error) {
      return invalidDataMsg(res, result.error);
    }
    const updatedSale = {
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
      updatedSale
    });
  }

  static deleteSale(req, res) {
    const Sale = _sales2.default.find(sale => sale.id === parseInt(req.params.id, 10));
    if (!Sale) {
      return res.status(404).json({
        status: 'error',
        message: 'The Sale with the given ID was not found.'
      });
    }

    const index = _sales2.default.indexOf(Sale);
    _sales2.default.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Sale Deleted Successfully'
    });
  }
}

exports.default = SalesController;