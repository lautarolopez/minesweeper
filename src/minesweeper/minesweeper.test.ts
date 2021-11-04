import { COLUMNS_NUMBER, ROWS_NUMBER, MINES_NUMBER } from '../constants';
import { IGame, Cell } from '../types';
import { createNewGame } from './minesweeper.controller';

describe('Create new game', () => {
  test('Should create a new game.', () => {
    const newGame: IGame = createNewGame();
    let minesAmmount = 0;
    expect(newGame.board).toHaveLength(ROWS_NUMBER);
    newGame.board.forEach((row: Cell[]) => {
      expect(row).toHaveLength(COLUMNS_NUMBER);
      minesAmmount += row.filter((cell: Cell) => cell.value === 9).length;
    });
    expect(minesAmmount).toBe(MINES_NUMBER);
  });

  test('Should have correct value of near mines in each cell', () => {
    const newGame: IGame = createNewGame();
    for (let i = 0; i < ROWS_NUMBER; i++) {
      for (let x = 0; x < ROWS_NUMBER; x++) {
        if (newGame.board[i][x].value !== 0 && newGame.board[i][x].value !== 9) {
          let ammountOfMines = 0;
          const startRow = Math.max(0, i - 1);
          const startColumn = Math.max(0, x - 1);
          const lastRow = Math.min(ROWS_NUMBER - 1, i + 1);
          const lastColumn = Math.min(COLUMNS_NUMBER - 1, x + 1);
          for (let z = startRow; z <= lastRow; z++) {
            for (let k = startColumn; k <= lastColumn; k++) {
              if (z !== i || k !== x) {
                if (newGame.board[z][k].value === 9) ammountOfMines++;
              }
            }
          }
          expect(ammountOfMines).toBe(newGame.board[i][x].value);
        }
      }
    }
  });
});
