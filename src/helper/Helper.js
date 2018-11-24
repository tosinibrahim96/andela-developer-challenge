import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Joi from "joi";
import dotenv from "dotenv";

dotenv.config();
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
	static isValiInfo(data) {
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
			password:Joi.required(),
			first_name: Joi.string().required(),
			mobile_number: Joi.string().regex(/^\d{3}\d{4}\d{4}$/).required(),
			image_url: Joi.string()
				.uri()
				.required()
		});

		return Joi.validate(data, schema);
	}

	static isValidEmail(data) {
		const schema = Joi.object().keys({
			email: Joi.string().email().required(),
		});

		return Joi.validate(data, schema);
	}

	/**
	 * Gnerate Token
	 */
	static generateToken(id, role) {
		const token = jwt.sign(
			{
				userId: id,
				userRole: role
			},
			process.env.SECRET,
			{ expiresIn: "7d" }
		);
		return token;
	}

	static validateProduct(data) {
		// define the validation schema
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			category_id: Joi.number().required(),
			price: Joi.number()
				.min(1)
				.required(),
			quantity: Joi.number()
				.min(1)
				.required(),
			description: Joi.string().required(),
			image_url: Joi.string()
				.uri()
				.required()
		});

		return Joi.validate(data, schema);
	}

	static validateCategory(data) {
		// define the validation schema
		const schema = Joi.object().keys({
			name: Joi.string().required(),
			image_url: Joi.string()
				.uri()
				.required(),
			description: Joi.string().required()
		});

		return Joi.validate(data, schema);
	}

	static validateAttendant(data) {
		// define the validation schema
		const schema = Joi.object().keys({
			sale_price: Joi.number()
				.required()
				.min(1)
		});

		return Joi.validate(data, schema);
	}

	static validateSale(data) {
		// define the validation schema
		const schema = Joi.object().keys({
			product_id: Joi.number()
				.required()
				.min(1),
			quantity: Joi.number()
				.min(1)
				.required(),
			item_price: Joi.number()
				.min(1)
				.required()
		});

		return Joi.validate(data, schema);
	}

	static productNotFound(res) {
		res.status(404).json({
			status: "error",
			message: "The Product With the Given ID Was not Found."
		});
	}

	static noSalesRecord(res) {
		res.status(404).json({
			message: "The User does not any sales record at the moment."
		});
	}

	static invalidDataMsg(res, error) {
		// send a 422 error response if validation fails
		res.status(422).json({
			status: "error",
			message: "Invalid request data",
			error: error.details[0].message
		});
	}
}

export default Helper;
