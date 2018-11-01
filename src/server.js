// server.js
import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './routes/products';
import salesRoute from './routes/sales';
import usersRoute from './routes/users';
import categoriesRoute from './routes/categories';
import dotenv from 'dotenv';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;


// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRoute);
app.use(salesRoute);
app.use(usersRoute);
app.use(categoriesRoute);
app.get('/', (req, res) => res.send('Welcome to shoppy!'))
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default server;
