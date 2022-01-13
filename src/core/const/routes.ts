import { WorkField } from '../../components';
import {
  GameSettingsPage,
  GameLadderPage,
  PlayGamePage,
  AboutGamePage,
} from '../../pages';

import { chooseImages, loadImages } from '../../shared';
import { IRoutes } from '../models/routes-models';
import { BASE_URL } from './consts';

const gameSettings = new GameSettingsPage(`${BASE_URL}game-setting.json`);

export const routes: IRoutes[] = [
  {
    path: 'game',
    page: async (): Promise<WorkField> => {
      const category = gameSettings.getCategory();
      const difficulty = gameSettings.getDifficulty();

      const container = new WorkField();

      const data = await loadImages(category);

      let images = await chooseImages(difficulty, data);
      images = images.map((img) => `${BASE_URL}${category}/${img}`);

      const newGame = new PlayGamePage(images);

      await newGame.setGridTemplate(difficulty);
      newGame.startGame(images);
      container.render(newGame.component);
      return container;
    },
  },
  {
    path: 'aboutgame',
    page: () : WorkField => {
      const container = new WorkField();
      const aboutGame = new AboutGamePage();
      container.render(aboutGame.component);

      return container;
    },
  },
  {
    path: 'gamesettings',
    page: async (): Promise<WorkField> => {
      const container = new WorkField();
      if (!container) throw new Error();
      container.render(gameSettings.component);

      return container;
    },
  },
  {
    path: 'ladder',
    page: async (): Promise<WorkField> => {
      const container = new WorkField();
      const ladderPage = new GameLadderPage();
      await ladderPage.getResults();
      container.render(ladderPage.component);

      return container;
    },
  },
];
