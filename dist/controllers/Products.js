'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

var _Helper = require('../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Product {
  /**
  * Get all Categories
  */
  static async getAllProducts(req, res) {
    const findAllQuery = 'select * FROM products';
    try {
      const { rows } = await _conn2.default.query(findAllQuery);
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
      const { rows } = await _conn2.default.query(text, [req.params.id]);
      if (!rows[0]) {
        return _Helper2.default.productNotFound(res);
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
    const result = _Helper2.default.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return _Helper2.default.invalidDataMsg(res, result.error);
      }
      const checkCategory = 'SELECT * FROM categories WHERE id =$1';
      const catValues = [parseInt(req.body.category_id, 10)];
      const createQuery = 'INSERT INTO products (name,cat_id,price,quantity,description,image_url) VALUES ($1,$2,$3,$4,$5) returning *';
      const values = [req.body.name.trim(), parseInt(req.body.category_id, 10), req.body.price, req.body.quantity, req.body.description.trim(), req.body.image_url.trim()];
      try {
        const { rowCount } = await _conn2.default.query(checkCategory, catValues);
        if (rowCount <= 0) {
          res.status(400).send({ message: 'The category does not exist' });
          return;
        }
        const { rows } = await _conn2.default.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        console.log(res.status(422).send(error));
      }
    }return res.status(401).send({ Message: 'Unauthorised Action' });
  }

  static async updateProduct(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = _Helper2.default.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return _Helper2.default.invalidDataMsg(res, result.error);
      }
      const findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
      const updateProduct = `UPDATE products
      SET name=$1,cat_id=$2,price=$3,quantity=$4,description=$5
      WHERE id=$6`;
      try {
        const { rows } = await _conn2.default.query(findProduct, [req.params.id, parseInt(req.body.category_id, 10)]);
        if (!rows[0]) {
          res.status(400).send({ message: 'The Product not in this category' });
          return;
        }
        const values = [req.body.name.trim() || rows[0].name, parseInt(req.body.category_id, 10) || rows[0].cat_id, req.body.price || rows[0].price, req.body.quantity || rows[0].quantity, req.body.description.trim() || rows[0].description, req.body.image_url.trim() || rows[0].image_url, req.params.id];
        await _conn2.default.query(updateProduct, values);
        return res.status(200).send({ Message: 'Product update successful' });
      } catch (err) {
        return res.status(400).send(err);
      }
    }return res.status(401).send({ Message: 'Unauthorised Action' });
  }

  static async deleteProduct(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = _Helper2.default.validateProduct(data);
    if (userRole === 'admin') {
      if (result.error) {
        return _Helper2.default.invalidDataMsg(res, result.error);
      }
      const findProduct = 'SELECT * FROM products WHERE id=$1 AND cat_id=$2';
      const deleteProduct = `DELETE FROM products
      WHERE id=$1`;
      try {
        const { rows } = await _conn2.default.query(findProduct, [req.params.id, parseInt(req.body.category_id, 10)]);
        if (!rows[0]) {
          res.status(400).send({ message: 'The Product not in this category' });
          return;
        }
        const values = [req.params.id];
        await _conn2.default.query(deleteProduct, values);
        return res.status(200).send({ Message: 'Product deleted successfuly' });
      } catch (err) {
        return res.status(400).send(err);
      }
    }return res.status(401).send({ Message: 'Unauthorised Action' });
  }
}

exports.default = Product;