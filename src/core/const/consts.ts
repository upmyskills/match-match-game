import { BaseLinks, IInputField } from '../models';
import { IStep } from '../models/steps-model';

export const DEFAULT_COUNTDOWN = 10;
export const FLIP_DELAY = 1000;
export const DATABASE_NAME = 'upmyskills/match-match-db';
export const BASE_URL = `${window.location.origin}${window.location.pathname}`;
export const CONFIG_PATH = `${BASE_URL}game-setting.json`;

export const HEADER_LINKS: BaseLinks[] = [
  {
    name: 'About Game',
    href: '#aboutgame',
    icon: `${BASE_URL}imgs/aboutgame.png`,
  },
  {
    name: 'Game Settings',
    href: '#gamesettings',
    icon: `${BASE_URL}imgs/gamesettings.png`,
  },
  {
    name: 'Best Score',
    href: '#ladder',
    icon: `${BASE_URL}imgs/bestscore.png`,
  },
];

export const STEPS: IStep[] = [
  {
    step: '1',
    text: 'Register new player in game.',
    imagepath: './imgs/htp-newplayer.png',
    imagealt: 'New player',
  },
  {
    step: '2',
    text: 'Configure your game settings.',
    imagepath: './imgs/htp-gamesettings.png',
    imagealt: 'Game settings',
  },
  {
    step: '3',
    text: 'Start you new game! Remember card positions and match it before times up.',
    imagepath: './imgs/htp-gamefield.png',
    imagealt: 'Game field',
  },
];

export const INPUTS: IInputField[] = [
  {
    caption: 'First Name',
    type: 'text',
    max: 30,
  },
  {
    caption: 'Last Name',
    type: 'text',
    max: 30,
  },
  {
    caption: 'E-mail',
    type: 'email',
    max: 25,
  },
];
