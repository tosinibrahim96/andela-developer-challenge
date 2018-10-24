import db from '../db/products';

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
      if (!req.body.title) {
         return res.status(400).send({
            success: 'false',
            message: 'title is required'
         });
      } else if (!req.body.description) {
         return res.status(400).send({
            success: 'false',
            message: 'description is required'
         });
      }
      const product = {
         id: db.length + 1,
         title: req.body.title,
         description: req.body.description
      }
      db.push(product);
      return res.status(201).send({
         success: 'true',
         message: 'product added successfully',
         product
      })
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

      if (!req.body.title) {
         return res.status(400).send({
            success: 'false',
            message: 'title is required',
         });
      } else if (!req.body.description) {
         return res.status(400).send({
            success: 'false',
            message: 'description is required',
         });
      }

      const updatedproduct = {
         id: productFound.id,
         title: req.body.title || productFound.title,
         description: req.body.description || productFound.description,
      };

      db.splice(productIndex, 1, updatedproduct);

      return res.status(201).send({
         success: 'true',
         message: 'product updated successfully',
         updatedproduct,
      });
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