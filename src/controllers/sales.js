import Joi from 'joi';
import db from '../db/sales';


class SalesController {
  getAllSales(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'Sales retrieved successfully',
      Sales: db
    });
  }

  getSale(req, res) {
    const Sale = db.find(sale => sale.id === parseInt(req.params.id, 10));
    if (!Sale) {
      return res.status(404).json({
        status: 'error',
        message: 'The Sale with the given ID was not found.',
      });
    }
    res.status(200).send(Sale);
  }

  createSales(req, res) {
    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      category: Joi.string().required(),
      quantity: Joi.number().integer().positive().greater(0)
        .required(),
      size: Joi.number().integer().positive().greater(0),
      price: Joi.number().positive().greater(0).required(),
      userId: Joi.number().positive().greater(0).required(),
    });


    // validate the request data against the schema
    Joi.validate(data, schema, (err) => {
      if (err) {
        // send a 422 error response if validation fails
        res.status(422).json({
          status: 'error',
          message: 'Invalid request data',
          error: err.details[0].message
        });
      } else if ((typeof req.body.name === 'number') || (typeof req.body.category === 'number')) {
        // send a 422 error response if  string is not entered for name and category
        res.status(422).json({
          status: 'error',
          message: 'Invalid data type for Name or Category',
        });
      } else {
        // If the input is not empty string
        const Sale = {
          id: db.length + 1,
          name: req.body.name.trim(),
          category: req.body.category.trim(),
          quantity: req.body.quantity,
          size: req.body.size,
          price: req.body.price,
          userId: req.body.userId
        };
        db.push(Sale);
        // send a success response if validation passes
        res.status(201).json({
          status: 'success',
          message: 'Sale created successfully',
          output: data
        });
      }
    });
  }

  updateSales(req, res) {
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
      return res.status(404).send({
        success: 'false',
        message: 'Sale not found',
      });
    }

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      category: Joi.string().required(),
      quantity: Joi.number().integer().positive().greater(0)
        .required(),
      size: Joi.number().integer().positive().greater(0),
      price: Joi.number().positive().greater(0).required(),
      userId: Joi.number().positive().greater(0).required(),
    });


    // validate the request data against the schema
    Joi.validate(data, schema, (err) => {
      if (err) {
        // send a 422 error response if validation fails
        res.status(422).json({
          status: 'error',
          message: 'Invalid request data',
          error: err.details[0].message
        });
      } else if ((typeof req.body.name === 'number') || (typeof req.body.category === 'number')) {
        // send a 422 error response if  string is not entered for name and category
        res.status(422).json({
          status: 'error',
          message: 'Invalid data type'
        });
      } else {
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

        return res.status(201).send({
          success: 'true',
          message: 'Sale updated successfully',
          updatedSale,
        });
      }
    });
  }


  deleteSale(req, res) {
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

const salesController = new SalesController();
export default salesController;
