import { Router } from 'express';
import { validateGameSchema } from './minesweeper.middleware';
import * as minesweeperController from './minesweeper.controller';

const minesweeperRouter = Router();

minesweeperRouter.get('/api', minesweeperController.createGame);

minesweeperRouter.get('/api/:gameId', minesweeperController.getGame);

minesweeperRouter.post('/api', validateGameSchema, minesweeperController.saveGame);

export default minesweeperRouter;
