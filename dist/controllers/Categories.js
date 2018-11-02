'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Category {
  /**
     * Create A Category
     */
  static async create(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      if (!req.body.name) {
        return res.status(400).send({ message: 'Category name is missing' });
      }

      const createQuery = 'INSERT INTO categories (name) VALUES ($1) returning *';
      const values = [req.body.name];
      try {
        const { rows } = await _conn2.default.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        console.log(res.status(400).send(error));
      }
    }
    return res.status(401).send({ Message: 'Unauthorised Action' });
  }

  /**
  * Get all Categories
  */
  static async getAllCategories(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const findAllQuery = 'select * FROM categories';
      try {
        const { rows } = await _conn2.default.query(findAllQuery);
        return res.status(200).send({ rows });
      } catch (error) {
        return res.status(400).send({ error });
      }
    }
    return res.status(401).send({ Message: 'Unauthorised Action' });
  }
}

exports.default = Category;