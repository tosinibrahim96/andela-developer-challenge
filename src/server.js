// server.js
import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './routes/products';
import salesRoute from './routes/sales';
import usersRoute from './routes/users';
import categoriesRoute from './routes/categories';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.static("UI"));
// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRoute);
app.use(salesRoute);
app.use(usersRoute);
app.use(categoriesRoute);
app.get('/api/v1', (req, res) => {
	res.status(200).send({ message: "welcome to Shoppy" });
});
const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default server;
