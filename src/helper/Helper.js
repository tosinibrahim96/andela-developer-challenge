import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Joi from 'joi';

class Helper {
  /**
   * Hash Password Method
   */
  static hashPassword(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(7));
  }

  /**
   * comparePassword
   */
  static comparePassword(hashPassword, password) {
    return bcrypt.compareSync(password, hashPassword);
  }

  /**
   * isValidEmail helper method
   */
  static isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  /**
   * Gnerate Token
   */
  static generateToken(id, role) {
    const token = jwt.sign({
      userId: id,
      userRole: role,
    }, process.env.SECRET, { expiresIn: '7d' });
    return token;
  }

  static validateProduct(data) {
    // define the validation schema
    const schema = Joi.object().keys({
      name: Joi.string().required(),
      category_id: Joi.number().required(),
    });

    return Joi.validate(data, schema);
  }

  static productNotFound(res) {
    res.status(404).json({
      status: 'error',
      message: 'The Product With the Given ID Was not Found.',
    });
  }

  static invalidDataMsg(res, error) {
    // send a 422 error response if validation fails
    res.status(422).json({
      status: 'error',
      message: 'Invalid request data',
      error: error.details[0].message
    });
  }
}

export default Helper;
