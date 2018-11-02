'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _conn = require('../models/conn');

var _conn2 = _interopRequireDefault(_conn);

var _Helper = require('../helper/Helper');

var _Helper2 = _interopRequireDefault(_Helper);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class User {
  /**
    * Create A User
    */
  static async create(req, res) {
    const userRole = req.user.role;
    const email = req.body.email;
    const emailObject = { email: email };
    const answer = _Helper2.default.isValidEmail(emailObject);
    if (userRole === 'admin') {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Some values are missing' });
      }
      if (answer.error) {
        res.status(400).send({ message: 'Please enter a valid email address' });
        return;
      }
      const hashPassword = _Helper2.default.hashPassword(req.body.password);

      const createQuery = 'INSERT INTO users (email,password,role) VALUES ($1, $2, $3) returning *';
      const values = [req.body.email, hashPassword, 'attendant'];
      try {
        const { rows } = await _conn2.default.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ message: 'User with that EMAIL already exist' });
        }
        console.log(res.status(400).send('error'));
      }
    }
    return res.status(401).send({ Message: 'Unauthorised Action' });
  }

  /**
  * Get all Users
  */
  static async getAllUsers(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const findAllQuery = 'select * FROM users';
      try {
        const { rows } = await _conn2.default.query(findAllQuery);
        return res.status(201).send({ rows });
      } catch (error) {
        return res.status(400).send({ error });
      }
    }
    return res.status(401).send({ Message: 'Unauthorised Action' });
  }

  /**
   * Login
   */
  static async login(req, res, next) {

    const email = req.body.email;
    const emailObject = { email: email };
    const answer = _Helper2.default.isValidEmail(emailObject);
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Some values are missing' });
      return;
    }
    if (answer.error) {
      res.status(400).send({ message: 'Please enter a valid email address' });
      return;
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await _conn2.default.query(text, [req.body.email]);
      if (!rows[0]) {
        res.status(400).send({ message: 'The credentials you provided is incorrect' });
        return;
      }
      if (!_Helper2.default.comparePassword(rows[0].password, req.body.password)) {
        res.status(400).send({ message: 'The credentials you provided is incorrect' });
        return;
      }
      const token = _Helper2.default.generateToken(rows[0].id, rows[0].role);
      res.status(200).send({
        token,
        message: 'Login Successful'
      });
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

exports.default = User;