import Joi from 'joi';
import db from '../db/products';


class ProductsController {
  getAllProducts(req, res) {
    res.status(200).send({
      success: 'true',
      message: 'Products Retrieved Successfully',
      products: db
    });
  }

  getProduct(req, res) {
    const Product = db.find(product => product.id === parseInt(req.params.id, 10));
    if (!Product) {
      return res.status(404).json({
        status: 'error',
        message: 'The Product With the Given ID Was not Found.',
      });
    }
    res.status(200).send(Product);
  }

  createProduct(req, res) {
    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
      name: Joi.string().regex(/^[A-Za-z ]+$/).required(),
      category: Joi.string().regex(/^[A-Za-z ]+$/).required(),
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
      } else {
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
          message: 'Product Created Successfully',
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
        message: 'Product not Found',
      });
    }

    // fetch the request data
    const data = req.body;

    // define the validation schema
    const schema = Joi.object().keys({
      name: Joi.string().regex(/^[A-Za-z ]+$/).required(),
      category: Joi.string().regex(/^[A-Za-z ]+$/).required(),
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
          message: 'Invalid request Data',
          data,
          error: err.details[0].message
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

        return res.status(200).send({
          success: 'true',
          message: 'Product Updated Successfully',
          updatedproduct,
        });
      }
    });
  }


  deleteProduct(req, res) {
    const Product = db.find(product => product.id === parseInt(req.params.id, 10));
    if (!Product) {
      return res.status(404).json({
        status: 'error',
        message: 'The Product With the Given ID Was not Found.',
      });
    }

    const index = db.indexOf(Product);
    db.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Product Deleted Successfully',
      data: Product
    });
  }
}

const productController = new ProductsController();
export default productController;
