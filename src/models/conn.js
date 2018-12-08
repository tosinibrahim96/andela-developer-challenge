import {
  Pool
} from 'pg';
import dotenv from 'dotenv';
import allTables from './schema';

dotenv.config();


const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect()
  .then((client) => {
    client.query(allTables)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        client.release();
        if (err.routine === '_bt_check_unique') {
          console.log({
            message: 'User with that EMAIL already exist'
          });

        }
      });
  });

export default {
  query: (text, params) => pool.query(text, params)
};