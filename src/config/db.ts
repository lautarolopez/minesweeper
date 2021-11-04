import { Game } from '../models';
import { ConnectionOptions } from 'typeorm';

const connection: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOSTNAME || 'postgres',
  port: 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'db',
  entities: [Game],
  synchronize: true,
  logging: false,
};

export default connection;
