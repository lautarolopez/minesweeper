import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import minesweeperRouter from './minesweeper/minesweeper.routes';
import dbConfig from './config/db';
import { createConnection } from 'typeorm';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(minesweeperRouter);

createConnection(dbConfig)
  .then((_connection) => {
    app.listen(port, () => {
      console.log(`Minesweeper up and running on port ${port}! 💣🚩`);
    });
  })
  .catch((error) => {
    console.error('Unable to connect to the database :(', error);
    process.exit(1);
  });
