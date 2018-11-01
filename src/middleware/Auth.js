import jwt from 'jsonwebtoken';
import db from '../models/conn';

class Auth {
  /**
    * Verify Token
    and do the next thing
    */
  static async verifyToken(req, res, next) {
    const headerToken = req.headers.token;
    if (!headerToken) {
      return res.status(400).send({ message: 'Token is not provided' });
    }
    try {
      const decodedToken = await jwt.verify(headerToken, process.env.SECRET);
      const text = 'SELECT * FROM users WHERE id = $1';
      const { rows } = await db.query(text, [decodedToken.userId]);
      if (!rows[0]) {
        return res.status(400).send({ message: 'The token you provided is invalid' });
      }
      req.user = { id: decodedToken.userId, role: decodedToken.userRole };
      next();
    } catch (error) {
      return res.status(400).send(error);
    }
  }
}

export default Auth;
