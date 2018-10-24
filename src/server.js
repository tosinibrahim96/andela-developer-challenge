// server.js
import express from 'express';
import productsRoute from './products/routes'
import bodyParser from 'body-parser';

const app = express()
const PORT = process.env.PORT || 3000;


// Parse incoming requests data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(productsRoute);

app.listen(PORT, () => {
   console.log(`server running on port ${PORT}`)
});