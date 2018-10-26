// server.js
import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './routes/products';
import salesRoute from './routes/sales';

const app = express();
const PORT = process.env.PORT || 3000;


// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRoute);
app.use(salesRoute);

const server = app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});

export default server;
