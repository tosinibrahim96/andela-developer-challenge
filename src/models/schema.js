import bcrypt from 'bcrypt';

const pword = bcrypt.hashSync('111111', bcrypt.genSaltSync());
/**
 * Create User Table
 */
const usersTable = `CREATE TABLE IF NOT EXISTS
      users(
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(40) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role  VARCHAR(20) NOT NULL DEFAULT ('attendant')
      );`;


/**
* Create Products Table
*/
const productTable = `CREATE TABLE IF NOT EXISTS
  products(
    id SERIAL PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    cat_id INTEGER NOT NULL,
    FOREIGN KEY(cat_id) REFERENCES categories(id) ON DELETE CASCADE
  );`;


/**
* Create Categories Table
*/
const categoryTable = `CREATE TABLE IF NOT EXISTS
      categories(
        id SERIAL PRIMARY KEY NOT NULL,
        name VARCHAR(40) NOT NULL
      );`;

const addAdmin = ` INSERT INTO users(email, password,role) 
VALUES ('admin@mail.com', '${pword}' ,'admin');`;

const tables = `${usersTable} ${addAdmin} ${categoryTable}  ${productTable}`;
export default tables;
