import { getCurrentRoute } from './current-route';
import { BASE_URL } from '../../core/const';

export const routeTo = (href: string): void => {
  const link = document.createElement('a');
  link.href = `${BASE_URL}${getCurrentRoute()}#${href}`;
  link.click();
  link.remove();
};
