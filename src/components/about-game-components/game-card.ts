import './about-game.scss';

class GameCard {
  component: HTMLElement;

  constructor(
    private readonly tag: string,
    private readonly styles: string[],
  ) {
    this.component = document.createElement(tag);
    this.component.classList.add(...styles);
  }

  addChild(child: HTMLElement): void {
    this.component.appendChild(child);
  }

  render(): HTMLElement {
    return this.component;
  }
}

export { GameCard };
