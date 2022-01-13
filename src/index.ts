import App from './app';
import { delUserFromLocalData, openConnection } from './core/services';

import './baseStyles.scss';

const root = <HTMLElement>document.querySelector('#root');

window.onload = () => {
  delUserFromLocalData();
  if (!root) throw Error('');
  const app = new App(root);
  app.init();
  openConnection();
};
