import { Request, Response } from 'express';
import { generateRandomNumber } from '../utils';
import { IGame, Cell } from '../types';
import { COLUMNS_NUMBER, MINES_NUMBER, ROWS_NUMBER } from '../constants';
import MinesweeperService from './minesweeper.service';

export const createNewGame = (): IGame => {
  const newGame: IGame = {
    board: [],
    cellsCleared: 0,
    rows: ROWS_NUMBER,
    columns: COLUMNS_NUMBER,
  };
  for (let i = 0; i < ROWS_NUMBER; i++) {
    const newColumn = new Array<Cell>(COLUMNS_NUMBER);
    for (let x = 0; x < COLUMNS_NUMBER; x++) {
      newColumn[x] = {
        status: 0,
        value: 0,
      };
    }
    newGame.board.push(newColumn);
  }

  for (let i = 0; i < MINES_NUMBER; i++) {
    let randomRow = generateRandomNumber(0, ROWS_NUMBER - 1);
    let randomColumn = generateRandomNumber(0, COLUMNS_NUMBER - 1);
    while (newGame.board[randomRow][randomColumn].value === 9) {
      randomRow = generateRandomNumber(0, ROWS_NUMBER - 1);
      randomColumn = generateRandomNumber(0, COLUMNS_NUMBER - 1);
    }
    newGame.board[randomRow][randomColumn].value = 9;
    const startRow = Math.max(0, randomRow - 1);
    const startColumn = Math.max(0, randomColumn - 1);
    const lastRow = Math.min(ROWS_NUMBER - 1, randomRow + 1);
    const lastColumn = Math.min(COLUMNS_NUMBER - 1, randomColumn + 1);
    for (let i = startRow; i <= lastRow; i++) {
      for (let x = startColumn; x <= lastColumn; x++) {
        const currentVal = newGame.board[i][x].value;
        if (currentVal !== 9) newGame.board[i][x].value = currentVal + 1;
      }
    }
  }
  return newGame;
};

export const createGame = (_req: Request, res: Response) => {
  return res.send(createNewGame());
};

export const getGame = async (req: Request, res: Response) => {
  try {
    const { gameId } = req.params;
    const response = await MinesweeperService.get(Number(gameId));
    if (response === null) return res.status(404).send(`We can´t find the game with id ${gameId} :(`);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
};

export const saveGame = async (req: Request, res: Response) => {
  const { game }: { game: IGame } = req.body;
  if (!game) return res.status(400).send('We need a valid game to save!');
  try {
    const response = await MinesweeperService.create(game);
    return res.status(200).send(response);
  } catch (error) {
    return res.status(400).send(error);
  }
};
