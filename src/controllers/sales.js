import Joi from 'joi';
import db from '../db/sales';

const validateSale = (data) => {
  // define the validation schema
  const schema = Joi.object().keys({
    name: Joi.string().regex(/^[A-Za-z ]+$/).required(),
    category: Joi.string().regex(/^[A-Za-z ]+$/).required(),
    quantity: Joi.number().integer().positive().greater(0)
      .required(),
    size: Joi.number().integer().positive().greater(0),
    price: Joi.number().positive().greater(0).required(),
    userId: Joi.number().positive().greater(0).required(),
  });

  return Joi.validate(data, schema);
};

const saleNotFound = (res) => {
  res.status(404).json({
    status: 'error',
    message: 'The Sale With the Given ID Was not Found.',
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
      Sales: db
    });
  }

  static getSale(req, res) {
    const Sale = db.find(sale => sale.id === parseInt(req.params.id, 10));
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
      id: db.length + 1,
      name: data.name.trim(),
      category: data.category.trim(),
      quantity: req.body.quantity,
      size: req.body.size,
      price: req.body.price,
      userId: req.body.userId
    };
    db.push(sale);
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
    db.map((Sale, index) => {
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

    db.splice(SaleIndex, 1, updatedSale);

    return res.status(200).send({
      success: 'true',
      message: 'Sale Updated Successfully',
      updatedSale,
    });
  }


  static deleteSale(req, res) {
    const Sale = db.find(sale => sale.id === parseInt(req.params.id, 10));
    if (!Sale) {
      return res.status(404).json({
        status: 'error',
        message: 'The Sale with the given ID was not found.',
      });
    }

    const index = db.indexOf(Sale);
    db.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Sale Deleted Successfully',
    });
  }
}


export default SalesController;
