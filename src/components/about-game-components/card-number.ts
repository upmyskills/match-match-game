import { GameCard } from './game-card';

class CardNumber {
  cardNumber: HTMLElement;

  constructor(
    private readonly text: string,
    private readonly styles: string[],
  ) {
    this.cardNumber = document.createElement('div');
    this.cardNumber.textContent = text;
    this.cardNumber.classList.add(...styles);
  }

  addToParent(parentElement: GameCard): void {
    parentElement.addChild(this.cardNumber);
  }
}

export { CardNumber };
