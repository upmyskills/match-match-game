import { BASE_URL } from '../../core/const';

export const getCurrentRoute = (): string => {
  const currRoute = window.location.href;
  let route = '';
  if (currRoute.includes('#')) {
    [route] = currRoute.split('#').reverse();
  } else if (currRoute.includes('/')) {
    [route] = currRoute.split('/').reverse();
  }

  return route;
};

export const setCurrentRoute = (path: string): void => {
  window.history.pushState(null, `${BASE_URL}${path}`, `${BASE_URL}${path}`);
};
