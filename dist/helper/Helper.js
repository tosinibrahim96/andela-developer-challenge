"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _bcrypt = require("bcrypt");

var _bcrypt2 = _interopRequireDefault(_bcrypt);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _joi = require("joi");

var _joi2 = _interopRequireDefault(_joi);

var _dotenv = require("dotenv");

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();
class Helper {
	/**
  * Hash Password Method
  */
	static hashPassword(password) {
		return _bcrypt2.default.hashSync(password, _bcrypt2.default.genSaltSync(7));
	}

	/**
  * comparePassword
  */
	static comparePassword(hashPassword, password) {
		return _bcrypt2.default.compareSync(password, hashPassword);
	}

	/**
  * isValidEmail helper method
  */
	static isValiInfo(data) {
		const schema = _joi2.default.object().keys({
			email: _joi2.default.string().email().required(),
			password: _joi2.default.required(),
			first_name: _joi2.default.string().required(),
			mobile_number: _joi2.default.string().regex(/^\d{3}\d{4}\d{4}$/).required(),
			image_url: _joi2.default.string().uri().required()
		});

		return _joi2.default.validate(data, schema);
	}

	static isValidEmail(data) {
		const schema = _joi2.default.object().keys({
			email: _joi2.default.string().email().required()
		});

		return _joi2.default.validate(data, schema);
	}

	/**
  * Gnerate Token
  */
	static generateToken(id, role) {
		const token = _jsonwebtoken2.default.sign({
			userId: id,
			userRole: role
		}, process.env.SECRET, { expiresIn: "7d" });
		return token;
	}

	static validateProduct(data) {
		// define the validation schema
		const schema = _joi2.default.object().keys({
			name: _joi2.default.string().required(),
			category_id: _joi2.default.number().required(),
			price: _joi2.default.number().min(1).required(),
			quantity: _joi2.default.number().min(1).required(),
			description: _joi2.default.string().required(),
			image_url: _joi2.default.string().uri().required()
		});

		return _joi2.default.validate(data, schema);
	}

	static validateCategory(data) {
		// define the validation schema
		const schema = _joi2.default.object().keys({
			name: _joi2.default.string().required(),
			image_url: _joi2.default.string().uri().required(),
			description: _joi2.default.string().required()
		});

		return _joi2.default.validate(data, schema);
	}

	static validateAttendant(data) {
		// define the validation schema
		const schema = _joi2.default.object().keys({
			sale_price: _joi2.default.number().required().min(1)
		});

		return _joi2.default.validate(data, schema);
	}

	static validateSale(data) {
		// define the validation schema
		const schema = _joi2.default.object().keys({
			product_id: _joi2.default.number().required().min(1),
			quantity: _joi2.default.number().min(1).required(),
			item_price: _joi2.default.number().min(1).required()
		});

		return _joi2.default.validate(data, schema);
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

exports.default = Helper;