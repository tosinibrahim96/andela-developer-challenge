// server.js
import express from 'express';
import bodyParser from 'body-parser';
import productsRoute from './products/routes';

const app = express();
const PORT = process.env.PORT || 3000;


// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRoute);

app.listen(PORT, () => {
  console.log(`server running on port ${PORT}`);
});
