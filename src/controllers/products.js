import db from "../models/conn";
import Helper from "../helper/Helper";

class Product {
	/**
	 * Get all Categories
	 */
	static async getAllProducts(req, res) {
		const findAllQuery = `select products.id AS product_id,products.price AS product_price,
    products.quantity AS product_quantity,products.description AS product_description,
      products.image_url AS product_image_url,products.cat_id AS category_id,
    categories.name AS category_name,products.name AS product_name 
    FROM categories inner join products on categories.id = products.cat_id`;
		try {
			const { rows } = await db.query(findAllQuery);
			return res.status(200).send({ rows });
		} catch (error) {
			return res.status(400).send({ error });
		}
	}

	/**
	 * Get A Product
	 */
	static async getProduct(req, res) {
    const text = `select products.id AS product_id,products.price AS product_price,products.quantity AS product_quantity,
    products.description AS product_description,products.image_url AS product_image_url,products.cat_id AS category_id,
    categories.name AS category_name,products.name AS product_name 
    FROM categories inner join products on categories.id = products.cat_id WHERE products.id = $1`;
		try {
			const { rows } = await db.query(text, [req.params.id]);
			if (!rows[0]) {
				return Helper.productNotFound(res);
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
		const result = Helper.validateProduct(data);
		if (userRole === "admin") {
			if (result.error) {
				return Helper.invalidDataMsg(res, result.error);
			}
			const checkCategory = "SELECT * FROM categories WHERE id =$1";
			const catValues = [parseInt(req.body.category_id, 10)];
			const createQuery =
				"INSERT INTO products (name,cat_id,price,quantity,description,image_url) VALUES ($1,$2,$3,$4,$5,$6) returning *";
			const values = [
				req.body.name.trim(),
				parseInt(req.body.category_id, 10),
				req.body.price,
				req.body.quantity,
				req.body.description.trim(),
				req.body.image_url.trim()
			];
			try {
				const { rowCount } = await db.query(checkCategory, catValues);
				if (rowCount <= 0) {
					res.status(400).send({ message: "The category does not exist" });
					return;
				}
				const { rows } = await db.query(createQuery, values);
				return res.status(201).send({ rows });
			} catch (error) {
				console.log(res.status(422).send(error));
			}
		} else {
			return res.status(401).send({ Message: "Unauthorised Action" });
		}
	}

	static async updateProduct(req, res) {
		const userRole = req.user.role;
		// fetch the request data
		const data = req.body;
		const result = Helper.validateProduct(data);
		if (userRole === "admin") {
			if (result.error) {
				return Helper.invalidDataMsg(res, result.error);
			}
			const findProduct = "SELECT * FROM products WHERE id=$1 AND cat_id=$2";
			const updateProduct = `UPDATE products
      SET name=$1,cat_id=$2,price=$3,quantity=$4,description=$5
      WHERE id=$6`;
			try {
				const { rows } = await db.query(findProduct, [
					req.params.id,
					parseInt(req.body.category_id, 10)
				]);
				if (!rows[0]) {
					res.status(400).send({ message: "The Product not in this category" });
					return;
				}
				const values = [
					req.body.name.trim() || rows[0].name,
					parseInt(req.body.category_id, 10) || rows[0].cat_id,
					req.body.price || rows[0].price,
					req.body.quantity || rows[0].quantity,
					req.body.description.trim() || rows[0].description,
					req.body.image_url.trim() || rows[0].image_url,
					req.params.id
				];
				await db.query(updateProduct, values);
				return res.status(200).send({ Message: "Product update successful" });
			} catch (err) {
				return res.status(400).send(err);
			}
		}
		return res.status(401).send({ Message: "Unauthorised Action" });
	}

	static async deleteProduct(req, res) {
		const userRole = req.user.role;
		// fetch the request data
		const data = req.body;
		const result = Helper.validateProduct(data);
		if (userRole === "admin") {
			if (result.error) {
				return Helper.invalidDataMsg(res, result.error);
			}
			const findProduct = "SELECT * FROM products WHERE id=$1 AND cat_id=$2";
			const deleteProduct = `DELETE FROM products
      WHERE id=$1`;
			try {
				const { rows } = await db.query(findProduct, [
					req.params.id,
					parseInt(req.body.category_id, 10)
				]);
				if (!rows[0]) {
					res.status(400).send({ message: "The Product not in this category" });
					return;
				}
				const values = [req.params.id];
				await db.query(deleteProduct, values);
				return res.status(200).send({ Message: "Product deleted successfuly" });
			} catch (err) {
				return res.status(400).send(err);
			}
		}
		return res.status(401).send({ Message: "Unauthorised Action" });
	}
}

export default Product;
