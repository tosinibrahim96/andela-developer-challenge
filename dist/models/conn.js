'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _pg = require('pg');

var _dotenv = require('dotenv');

var _dotenv2 = _interopRequireDefault(_dotenv);

var _schema = require('./schema');

var _schema2 = _interopRequireDefault(_schema);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_dotenv2.default.config();

const pool = new _pg.Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect().then(client => {
  client.query(_schema2.default).then(res => {
    console.log(res);
  }).catch(err => {
    client.release();if (err.routine === '_bt_check_unique') {
      console.log({ message: 'User with that EMAIL already exist' });
    }
  });
});

exports.default = {
  query: (text, params) => pool.query(text, params)
};