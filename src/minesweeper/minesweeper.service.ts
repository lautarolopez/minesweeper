import { Game } from '../models';
import { IGame } from '../types';
import { getRepository } from 'typeorm';

const MinesweeperService = {
  create: async (game: IGame): Promise<Game> => {
    const gameRepository = getRepository(Game);
    const newGame = new Game();
    return gameRepository.save({
      ...newGame,
      ...game,
    });
  },
  get: async (id: number): Promise<Game | null> => {
    const gameRepository = getRepository(Game);
    const game = await gameRepository.findOne({ id });
    if (!game) return null;
    return game;
  },
};

export default MinesweeperService;
