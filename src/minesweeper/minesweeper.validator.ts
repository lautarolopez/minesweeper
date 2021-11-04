import Ajv, { JSONSchemaType } from 'ajv';
import { IGame, Cell } from '../types';

const ajv = new Ajv();

const cellSchema: JSONSchemaType<Cell> = {
  type: 'object',
  properties: {
    status: { type: 'integer' },
    value: { type: 'integer' },
  },
  required: ['status', 'value'],
};

const gameSchema: JSONSchemaType<IGame> = {
  type: 'object',
  properties: {
    id: { type: 'number', nullable: true },
    board: { type: 'array', items: { type: 'array', items: cellSchema } },
    cellsCleared: { type: 'integer' },
    rows: { type: 'integer' },
    columns: { type: 'integer' },
  },
  required: ['board', 'cellsCleared', 'columns', 'rows'],
  additionalProperties: false,
};

const gameValidator = ajv.compile(gameSchema);

export default gameValidator;
