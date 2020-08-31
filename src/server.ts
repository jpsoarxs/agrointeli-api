require('dotenv/config');

import express from 'express';
import { errors } from 'celebrate';
import cors from 'cors';

import routes from './routes';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());

app.use(routes);

app.use(errors());

var PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta: ${PORT}`)
});
