import Joi from 'joi';
import db from '../db/products';

const validateProduct = (data) => {
  // define the validation schema
  const schema = Joi.object().keys({
    name: Joi.string().regex(/^[A-Za-z ]+$/).required(),
    category: Joi.string().regex(/^[A-Za-z ]+$/).required(),
    quantity: Joi.number().integer().positive().greater(0)
      .required(),
    size: Joi.number().integer().positive().greater(0),
    price: Joi.number().positive().greater(0).required(),
  });

  return Joi.validate(data, schema);
};

const productNotFound = (res) => {
  res.status(404).json({
    status: 'error',
    message: 'The Product With the Given ID Was not Found.',
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
      return productNotFound(res);
    }
    res.status(200).send({
      success: 'true',
      message: 'Product Retrieved Successfully',
      Product
    });
  }

  createProduct(req, res) {
    // fetch the request data
    const data = req.body;
    const result = validateProduct(data);


    if (result.error) {
      return invalidDataMsg(res, result.error);
    }
    const product = {
      id: db.length + 1,
      name: data.name.trim(),
      category: data.category.trim(),
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
      return productNotFound(res);
    }

    // fetch the request data
    const data = req.body;
    const result = validateProduct(data);

    if (result.error) {
      return invalidDataMsg(res, result.error);
    }
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


  deleteProduct(req, res) {
    const Product = db.find(product => product.id === parseInt(req.params.id, 10));
    if (!Product) {
      return productNotFound(res);
    }
    const index = db.indexOf(Product);
    db.splice(index, 1);
    return res.status(200).send({
      success: 'true',
      message: 'Product Deleted Successfully',
    });
  }
}

const productController = new ProductsController();
export default productController;
