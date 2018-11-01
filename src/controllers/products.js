import db from '../models/conn';
import Helper from '../helper/Helper';


/**
    * Create A Product
    */
class Product {
  /**
  * Get all Categories
  */
  static async getAllProducts(req, res) {
    const findAllQuery = 'select * FROM products';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).send({ rows });
    } catch (error) {
      return res.status(400).send({ error });
    }
  }


  /**
   * Get A Product
   */
  static async getProduct(req, res) {
    const text = 'SELECT * FROM products WHERE id = $1';
    try {
      const { rows } = await db.query(text, [req.params.id]);
      if (!rows[0]) {
        return Helper.productNotFound(res);
      }
      return res.status(200).send(rows[0]);
    } catch (error) {
      return res.status(400).send(error);
    }
  }

  static async createProduct(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = Helper.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return Helper.invalidDataMsg(res, result.error);
      }
      const checkCategory = 'SELECT * FROM categories WHERE id =$1';
      const catValues = [
        parseInt(req.body.category_id, 10)
      ];
      const createQuery = 'INSERT INTO products (name,cat_id) VALUES ($1,$2) returning *';
      const values = [
        req.body.name.trim(),
        parseInt(req.body.category_id, 10)
      ];
      try {
        const { rowCount } = await db.query(checkCategory, catValues);
        if (rowCount <= 0) {
          res.status(400).send({ message: 'The category does not exist' });
          return;
        }
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        console.log(res.status(400).send(error));
      }
    } return res.status(401).send({ Message: 'You are not allowed to view this page' });
  }

  static async updateProduct(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = Helper.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return Helper.invalidDataMsg(res, result.error);
      }
      const findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
      const updateProduct = `UPDATE products
      SET name=$1,cat_id=$2
      WHERE id=$3`;
      try {
        const { rows } = await db.query(findProduct,
          [req.params.id, parseInt(req.body.category_id, 10)]);
        if (!rows[0]) {
          res.status(400).send({ message: 'The Product not in this category' });
          return;
        }
        const values = [
          req.body.name.trim() || rows[0].name,
          parseInt(req.body.category_id, 10) || rows[0].cat_id,
          req.params.id,
        ];
        await db.query(updateProduct, values);
        return res.status(200).send({ Message: 'Product update successful' });
      } catch (err) {
        return res.status(400).send(err);
      }
    } return res.status(401).send({ Message: 'You are not allowed to view this page' });
  }


  static async deleteProduct(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = Helper.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return Helper.invalidDataMsg(res, result.error);
      }
      const findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
      const deleteProduct = `DELETE FROM products
      WHERE id=$1`;
      try {
        const { rows } = await db.query(findProduct,
          [req.params.id, parseInt(req.body.category_id, 10)]);
        if (!rows[0]) {
          res.status(400).send({ message: 'The Product not in this category' });
          return;
        }
        const values = [
          req.params.id,
        ];
        await db.query(deleteProduct, values);
        return res.status(200).send({ Message: 'Product deleted successfuly' });
      } catch (err) {
        return res.status(400).send(err);
      }
    } return res.status(401).send({ Message: 'You are not allowed to view this page' });
  }
}


export default Product;
