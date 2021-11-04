export type StatusType = 0 | 1 | 2;

export interface Cell {
  status: StatusType;
  value: number;
}

export interface IGame {
  id?: number;
  board: Array<Array<Cell>>;
  cellsCleared: number;
  rows: number;
  columns: number;
}
