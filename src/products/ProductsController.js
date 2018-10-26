import Joi from 'joi';
import db from '../db/products';


class ProductsController {
  getAllProducts(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'products retrieved successfully',
      products: db
    });
  }

  getProduct(req, res) {
    const product = db.find(p => p.id === parseInt(req.params.id, 10));
    if (!product) {
      return res.status(404).json({
        status: 'error',
        message: 'The product with the given ID was not found.',
      });
    }
    res.status(200).send(product);
  }

  createProduct(req, res) {
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
    });


    // validate the request data against the schema
    Joi.validate(data, schema, (err) => {
      if (err) {
        // send a 422 error response if validation fails
        res.status(422).json({
          status: 'error',
          message: 'Invalid request data',
          data,
          error: err.details[0].message
        });
      } else if ((typeof req.body.name !== 'string') || (typeof req.body.category !== 'string') || (typeof req.body.price !== 'number')
        || (typeof req.body.quantity !== 'number') || (typeof req.body.size !== 'number')) {
        // send a 422 error response if  string is not entered for name and category
        res.status(422).json({
          status: 'error',
          message: 'Invalid data type for name or category',
          data
        });
      } else {
        // If the input is not empty string
        const product = {
          id: db.length + 1,
          name: req.body.name.trim(),
          category: req.body.category.trim(),
          quantity: req.body.quantity,
          size: req.body.size,
          price: req.body.price
        };
        db.push(product);
        // send a success response if validation passes
        res.status(201).json({
          status: 'success',
          message: 'Product created successfully',
          output: data
        });
      }
    });
  }

  updateProduct(req, res) {
    const id = parseInt(req.params.id, 10);
    let productFound;
    let productIndex;
    db.map((product, index) => {
      if (product.id === id) {
        productFound = product;
        productIndex = index;
      }
      return false;
    });

    if (!productFound) {
      return res.status(404).send({
        success: 'false',
        message: 'product not found',
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
    });


    // validate the request data against the schema
    Joi.validate(data, schema, (err) => {
      if (err) {
        // send a 422 error response if validation fails
        res.status(422).json({
          status: 'error',
          message: 'Invalid request data',
          data,
          error: err.details[0].message
        });
      } else if ((typeof req.body.name !== 'string') || (typeof req.body.category !== 'string') || (typeof req.body.price !== 'number')
        || (typeof req.body.quantity !== 'number') || (typeof req.body.size !== 'number')
      ) {
        // send a 422 error response if  string is not entered for name and category
        res.status(422).json({
          status: 'error',
          message: 'Invalid data type',
          data
        });
      } else {
        const updatedproduct = {
          id: productFound.id,
          name: req.body.name.trim() || productFound.name,
          category: req.body.category.trim() || productFound.category,
          quantity: req.body.quantity || productFound.quantity,
          size: req.body.size || productFound.size,
          price: req.body.price || productFound.price
        };

        db.splice(productIndex, 1, updatedproduct);

        return res.status(201).send({
          success: 'true',
          message: 'product updated successfully',
          updatedproduct,
        });
      }
    });
  }


  deleteProduct(req, res) {
    const product = db.find(p => p.id === parseInt(req.params.id, 10));
    if (!product) return res.status(404).send('The product with the given ID was not found.');

    const index = db.indexOf(product);
    db.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Product Deleted Successfully',
      data: product
    });
  }
}

const productController = new ProductsController();
export default productController;
