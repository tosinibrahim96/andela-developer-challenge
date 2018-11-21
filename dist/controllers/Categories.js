'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

var _Helper = require('../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Category {
  /**
     * Create A Category
     */
  static async create(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const data = req.body;
      const result = _Helper2.default.validateCategory(data);
      if (result.error) {
        return _Helper2.default.invalidDataMsg(res, result.error);
      }
      const createQuery = 'INSERT INTO categories (name,image_url,short_desc) VALUES ($1,$2,$3) returning *';
      const values = [req.body.name, req.body.image_url, req.body.description];
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