import { CONFIG_PATH } from '../../core/const';

export const countCards = async (difficulty: string): Promise<number> => {
  const res = await fetch(CONFIG_PATH);
  const difficulties = await res.json();
  let quantityCards = 0;
  for (let key = 0; key < difficulties.difficulty.length; key++) {
    if (difficulties.difficulty[key].option === difficulty) {
      quantityCards = difficulties.difficulty[key].value;
    }
  }

  return quantityCards;
};
