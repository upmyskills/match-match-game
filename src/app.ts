import { WorkField, HeaderMain } from './components';
import { Router } from './core';
import { BaseComponent, setCurrentRoute } from './shared';

class App {
  private mainHeader = new HeaderMain(['nav-menu']);

  private router = new Router();

  private workField = new WorkField();

  constructor(
    private readonly rootElement: HTMLElement,
  ) {
    this.rootElement = rootElement;

    this.renderStaticElemetns();
    this.router.route();
  }

  protected renderStaticElemetns(): void {
    this.rootElement.appendChild(this.mainHeader.headerContainer);
  }

  async init(): Promise<void> {
    setCurrentRoute('#aboutgame');

    this.render(await this.router.route());

    window.onpopstate = async () => {
      this.mainHeader.updateBtn();
      const content = await this.router.route();
      this.render(content);
    };
  }

  protected render(content: WorkField | void): void {
    this.workField.clear();
    try {
      if (content) this.rootElement.appendChild(content.workArea);
      else throw Error('Can\'t get content in app.js');
      this.workField = content;
    } catch (e) {
      const errorBlock = new BaseComponent('div', ['critical-error']);
      errorBlock.component.innerText = e.message;
      this.rootElement.appendChild(errorBlock.component);
    }
  }
}

export default App;
