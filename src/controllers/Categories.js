import db from '../models/conn';
import Helper from "../helper/Helper";

class Category {
  /**
     * Create A Category
     */
  static async create(req, res) {
    const userRole = req.user.role;
    if (userRole === 'admin') {
      const data = req.body;
      const result = Helper.validateCategory(data);
      if (result.error) {
				return Helper.invalidDataMsg(res, result.error);
			}
      const createQuery = 'INSERT INTO categories (name,image_url,short_desc) VALUES ($1,$2,$3) returning *';
      const values = [req.body.name, req.body.image_url, req.body.description];
      try {
        const { rows } = await db.query(createQuery, values);
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
      const findAllQuery = 'select * FROM categories';
      try {
        const { rows } = await db.query(findAllQuery);
        return res.status(200).send({ rows });
      } catch (error) {
        return res.status(400).send({ error });
      }
  }

  static async getCategory(req, res){
    const userRole = req.user.role;

    if (userRole === "admin") {
      const findCategory = "SELECT * FROM categories WHERE id = $1";
      
      try {
        const { rows } = await db.query(findCategory, [req.params.id]);
        if (!rows[0]) {
          res.status(400).send({ message: "The Category does not exist" });
          return;
        }else{
          return res.status(200).send({ rows});
        }
      } catch (err) {
        return res.status(400).send(err);
      }
    }
    return res.status(401).send({ Message: "Unauthorised Action" });
  }


  static async updateCategory(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    const data = req.body;
    const result = Helper.validateCategory(data);
    if (userRole === "admin") {
      if (result.error) {
        return Helper.invalidDataMsg(res, result.error);
      }
      const findCategory = "SELECT * FROM categories WHERE id=$1";
      const updateCategory = `UPDATE categories
      SET name=$1,image_url=$2,short_desc=$3
      WHERE id=$4`;
      try {
        const { rows } = await db.query(findCategory, [req.params.id,]);
        if (!rows[0]) {
          res.status(400).send({ Message: "The Category does not exist" });
          return;
        }
        const values = [
          req.body.name.trim() || rows[0].name,
          req.body.image_url.trim() || rows[0].image_url,
          req.body.description.trim() || rows[0].short_desc,
          req.params.id
        ];
        await db.query(updateCategory, values);
        return res.status(200).send({ Message: "Category update successful"});
      } catch (err) {
        return res.status(400).send(err);
      }
    }
    return res.status(401).send({ Message: "Unauthorised Action" });
  }


  static async deleteCategory(req, res) {
    const userRole = req.user.role;
    // fetch the request data
    if (userRole === "admin") {
      const findCategory = "SELECT * FROM categories WHERE id = $1";
      const deleteCategory = "DELETE FROM categories WHERE id=$1";
      try {
        const { rows } = await db.query(findCategory, [req.params.id]);
        if (!rows[0]) {
          res.status(400).send({ message: "The Category does not exist" });
          return;
        }
        const values = [req.params.id];
        await db.query(deleteCategory, values);
        return res.status(200).send({ Message: "Category deleted successfuly" });
      } catch (err) {
        return res.status(400).send(err);
      }
    }
    return res.status(401).send({ Message: "Unauthorised Action" });
  }
}


export default Category;
