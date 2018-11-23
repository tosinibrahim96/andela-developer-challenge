import db from '../models/conn';
import Helper from '../helper/Helper';


class User {
  /**
    * Create A User
    */
  static async create(req, res) {
    const userRole = req.user.role;
    const data = req.body;
    const answer = Helper.isValiInfo(data);
    if (userRole === 'admin') {
      if (answer.error) {
        return Helper.invalidDataMsg(res, answer.error);
      }
      const hashPassword = Helper.hashPassword(req.body.password);

      const createQuery = 'INSERT INTO users (email,password,role,first_name,mobile_number,image_url,sales) VALUES ($1, $2, $3,$4,$5,$6,$7) returning *';
      const values = [      
        req.body.email,
        hashPassword,
        'attendant',
        req.body.first_name,
        req.body.mobile_number,
        req.body.image_url,
        parseInt('0')
      ];
      try {
        const { rows } = await db.query(createQuery, values);
        return res.status(201).send({ rows });
      } catch (error) {
        if (error.routine === '_bt_check_unique') {
          return res.status(400).send({ message: 'User with that EMAIL already exist' });
        }
        console.log(res.status(400).send({Error:error}));
      }
    }
    else{return res.status(401).send({ Message: 'Unauthorised Action' });}
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
    const answer = Helper.isValidEmail(emailObject);
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
