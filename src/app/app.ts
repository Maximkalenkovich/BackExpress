import express from 'express';
import { productsRoute } from '../routes/productsRoute';

export const app = express();

const jsonMiddleware = express.json();
app.use(jsonMiddleware);

app.use('/books', productsRoute);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
