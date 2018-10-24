import db from '../db/products';
import Joi from 'joi';

class ProductsController {

   getAllProducts(req, res) {
      res.status(200).send({
         success: 'true',
         message: 'products retrieved successfully',
         products: db
      })
   }

   getProduct(req, res) {
      const product = db.find(p => p.id === parseInt(req.params.id));
      if (!product) return res.status(404).send('The product with the given ID was not found.');
      res.send(product);
   }

   createProduct(req, res) {
      // fetch the request data
      const data = req.body

      // define the validation schema
      const schema = Joi.object().keys({
         name: Joi.string().regex(/^([a-zA-Z ]+)$/).required(),
         category: Joi.string().regex(/^([a-zA-Z]+)$/).required(),
         quantity: Joi.number().integer().positive().greater(0).required(),
         size: Joi.number().integer().positive().greater(0),
         price: Joi.number().positive().greater(0).required(),
      });



      // validate the request data against the schema
      Joi.validate(data, schema, (err, value) => {

         if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
               status: 'error',
               message: 'Invalid request data',
               data: data,
               error: err.details[0].message
            });
         } else {

            //Even when validation is correct, the string may be a bumch of empty characters or "null"
            //that's what we are checking here
            if ((req.body.name.match(/^\s*$/) || req.body.name === "null") || (req.body.category.match(/^\s*$/) || req.body.category === "null") || (req.body.quantity.match(/^\s*$/) || req.body.quantity === "null")
               || (req.body.size.match(/^\s*$/) || req.body.size === "null") || (req.body.price.match(/^\s*$/) || req.body.price === "null")
            ) {
               res.status(422).json({
                  status: 'error',
                  message: 'Confirm your input is not Empty or Null',
                  data: req.body,
               });
            } else {
               //If the input is not empty string
               const product = {
                  id: db.length + 1,
                  name: req.body.name,
                  category: req.body.category,
                  quantity: req.body.quantity,
                  size: req.body.size,
                  price: req.body.price
               }
               db.push(product);
               // send a success response if validation passes
               res.json({
                  status: 'success',
                  message: 'Product created successfully',
                  data: data
               });
            }


         }
      }
      );
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
      });

      if (!productFound) {
         return res.status(404).send({
            success: 'false',
            message: 'product not found',
         });
      }

      // fetch the request data
      const data = req.body

      // define the validation schema
      const schema = Joi.object().keys({
         name: Joi.string().regex(/^([a-zA-Z ]+)$/).required(),
         category: Joi.string().regex(/^([a-zA-Z]+)$/).required(),
         quantity: Joi.number().integer().positive().greater(0).required(),
         size: Joi.number().integer().positive().greater(0),
         price: Joi.number().positive().greater(0).required(),
      });



      // validate the request data against the schema
      Joi.validate(data, schema, (err, value) => {

         if (err) {
            // send a 422 error response if validation fails
            res.status(422).json({
               status: 'error',
               message: 'Invalid request data',
               data: data,
               error: err.details[0].message
            });
         } else {

            //Even when validation is correct, the string may be a bumch of empty characters or "null"
            //that's what we are checking here
            if ((req.body.name.match(/^\s*$/) || req.body.name === "null") || (req.body.category.match(/^\s*$/) || req.body.category === "null") || (req.body.quantity.match(/^\s*$/) || req.body.quantity === "null")
               || (req.body.size.match(/^\s*$/) || req.body.size === "null") || (req.body.price.match(/^\s*$/) || req.body.price === "null")
            ) {
               res.status(422).json({
                  status: 'error',
                  message: 'Confirm your input is not Empty or Null',
                  data: req.body,
               });
            } else {
               const updatedproduct = {
                  id: productFound.id,
                  name: req.body.name || productFound.name,
                  category: req.body.category || productFound.category,
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


         }
      }
      );
   }

   deleteProduct(req, res) {
      const product = db.find(p => p.id === parseInt(req.params.id));
      if (!product) return res.status(404).send('The product with the given ID was not found.');

      const index = db.indexOf(product);
      db.splice(index, 1);
      res.send(product);
   }

}

const productController = new ProductsController();
export default productController;