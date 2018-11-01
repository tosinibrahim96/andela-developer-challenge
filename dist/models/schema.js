'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bcrypt = require('bcrypt');

var _bcrypt2 = _interopRequireDefault(_bcrypt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pword = _bcrypt2.default.hashSync('111111', _bcrypt2.default.genSaltSync());
/**
 * Create User Table
 */
var usersTable = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY NOT NULL,\n        email VARCHAR(40) UNIQUE NOT NULL,\n        password VARCHAR(255) NOT NULL,\n        role  VARCHAR(20) NOT NULL DEFAULT (\'attendant\')\n      );';

/**
* Create Products Table
*/
var productTable = 'CREATE TABLE IF NOT EXISTS\n  products(\n    id SERIAL PRIMARY KEY NOT NULL,\n    name TEXT NOT NULL,\n    cat_id INTEGER NOT NULL,\n    price INTEGER NOT NULL,\n    quantity INTEGER NOT NULL,\n    description VARCHAR(40) NOT NULL,\n    FOREIGN KEY(cat_id) REFERENCES categories(id) ON DELETE CASCADE\n  );';

/**
* Create Categories Table
*/
var categoryTable = 'CREATE TABLE IF NOT EXISTS\n      categories(\n        id SERIAL PRIMARY KEY NOT NULL,\n        name VARCHAR(40) NOT NULL\n      );';

/**
* Create Sales Table
*/
var salesTable = 'CREATE TABLE IF NOT EXISTS\n  sales(\n    id SERIAL PRIMARY KEY NOT NULL,\n    product_id INTEGER NOT NULL,\n    user_id INTEGER NOT NULL,\n    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE,\n    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE  \n    );';

var addAdmin = ' INSERT INTO users(email, password,role) \nVALUES (\'admin@mail.com\', \'' + pword + '\' ,\'admin\');';

var tables = usersTable + ' ' + addAdmin + ' ' + categoryTable + '  ' + productTable + ' ' + salesTable;
exports.default = tables;