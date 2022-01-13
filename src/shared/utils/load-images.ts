import shuffle from 'lodash/shuffle';
import { CONFIG_PATH } from '../../core/const';

export const loadImages = async (category: string): Promise<string[]> => {
  const res = await fetch(CONFIG_PATH);
  const categories = await res.json();
  let imgages = [];

  for (let key = 0; key < categories.category.length; key++) {
    if (categories.category[key].option === category) {
      imgages = categories.category[key].value;
    }
  }

  return imgages;
};

export const chooseImages = async (difficulty: string, allImages: string[]): Promise<string[]> => {
  const res = await fetch(CONFIG_PATH);
  const difficulties = await res.json();
  let quantityCards = 0;

  for (let key = 0; key < difficulties.difficulty.length; key++) {
    if (difficulties.difficulty[key].option === difficulty) {
      quantityCards = difficulties.difficulty[key].value;
    }
  }

  const images = shuffle(allImages).slice(0, quantityCards);

  return images;
};
