'use strict';

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

var pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', function () {
  console.log('connected to the db');
});

/**
 * Create User Table
 */
var createUserTable = function createUserTable() {
  var queryText = 'CREATE TABLE IF NOT EXISTS\n      users(\n        id SERIAL PRIMARY KEY NOT NULL,\n        email VARCHAR(40) UNIQUE NOT NULL,\n        password VARCHAR(255) NOT NULL,\n        isAdmin BOOLEAN NOT NULL, \n      )';

  pool.query(queryText).then(function (res) {
    console.log(res);
    pool.end();
  }).catch(function (err) {
    console.log(err);
    pool.end();
  });
};

createUserTable();