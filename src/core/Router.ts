import { WorkField } from '../components';
import { getCurrentRoute, setCurrentRoute } from '../shared';
import { routes } from './const/routes';

class Router {
  curPath = window.location.hash;

  async route(): Promise<void | WorkField> {
    this.curPath = getCurrentRoute();

    setCurrentRoute(`${this.curPath}`);

    const targetRoute = routes.find((path) => path.path === this.curPath);
    const currentPage = await targetRoute?.page();

    if (!targetRoute) {
      setCurrentRoute('aboutgame');
      this.route();
    }

    return currentPage;
  }
}

export { Router };
