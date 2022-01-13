import { ResultModel } from '../models';
import { getUser } from '../services';

export const endGame = (points: number, difficulty = ''): ResultModel => {
  const player = JSON.parse((getUser() || ''));
  const playerData: ResultModel = {
    login: `${player.firstname} ${player.lastname}`,
    image: player.img || '',
    score: points.toFixed(3),
    difficulty,
  };

  return playerData;
};
