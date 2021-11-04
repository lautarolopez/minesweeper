import gameValidator from './minesweeper.validator';
import { Request, Response, NextFunction } from 'express';

export const validateGameSchema = (req: Request, res: Response, next: NextFunction) => {
  if (req.body.game && gameValidator(req.body.game)) next();
  else {
    return res.status(400).send(gameValidator.errors);
  }
};
