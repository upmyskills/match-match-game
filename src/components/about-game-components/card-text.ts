import { GameCard } from './game-card';

class CardText {
  card: HTMLElement;

  constructor(
    private readonly text: string,
    private readonly styles: string[],
  ) {
    this.card = document.createElement('div');
    this.card.textContent = text;
    this.card.classList.add(...styles);
  }

  addToParent(parentElement: GameCard): void {
    parentElement.addChild(this.card);
  }
}

export { CardText };
