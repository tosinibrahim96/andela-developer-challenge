import db from '../models/conn';
import Helper from './Helper';


class User {
  /**
    * Create A User
    */
  static async create(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      if (!req.body.email || !req.body.password) {
        return res.status(400).send({ message: 'Some values are missing' });
      }
      if (!Helper.isValidEmail(req.body.email)) {
        return res.status(400).send({ message: 'Please enter a valid email address' });
      }
      const hashPassword = Helper.hashPassword(req.body.password);

      const createQuery = 'INSERT INTO users (email,password,role) VALUES ($1, $2, $3) returning *';
      const values = [
        req.body.email,
        hashPassword,
        'attendant'
      ];
      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ message: 'User with that EMAIL already exist' });
        }
        console.log(res.status(400).send('error'));
      }
    }
    return res.status(401).send({ Message: 'You are not allowed to view this page' });
  }

  /**
 * Get all Users
 */
  static async getAllUsers(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const findAllQuery = 'select * FROM users';
      try {
        const { rows } = await db.query(findAllQuery);
        return res.status(200).send({ rows });
      } catch (error) {
        return res.status(400).send({ error });
      }
    }
    return res.status(401).send({ Message: 'You are not allowed to view this page' });
  }

  /**
   * Login
   */
  static async login(req, res, next) {
    if (!req.body.email || !req.body.password) {
      res.status(400).send({ message: 'Some values are missing' });
      return;
    }
    if (!Helper.isValidEmail(req.body.email)) {
      res.status(400).send({ message: 'Please enter a valid email address' });
      return;
    }
    const text = 'SELECT * FROM users WHERE email = $1';
    try {
      const { rows } = await db.query(text, [req.body.email]);
      if (!rows[0]) {
        res.status(400).send({ message: 'The credentials you provided is incorrect' });
        return;
      }
      if (!Helper.comparePassword(rows[0].password, req.body.password)) {
        res.status(400).send({ message: 'The credentials you provided is incorrect' });
        return;
      }
      const token = Helper.generateToken(rows[0].id, rows[0].role);
      res.status(200).send({
        token,
        message: 'Login Successful',
      });
      return next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}


export default User;
