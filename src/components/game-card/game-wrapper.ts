import { BaseComponent } from '../../shared';
import { Card } from './card/card';
import { DEFAULT_COUNTDOWN } from '../../core/const';

class GameWrapper extends BaseComponent {
  private cards: Card[] = [];

  constructor() {
    super('div', ['game-filed-wrapper']);
  }

  clear(): void {
    this.cards = [];
    this.component.innerText = '';
  }

  addCards(cards: Card[]): void {
    this.cards = cards;
    this.cards.forEach((card) => {
      this.component.appendChild(card.component);
    });
    setTimeout(() => {
      this.cards.forEach((card) => card.flipToBack());
    }, (1 + DEFAULT_COUNTDOWN) * 1000);
  }
}

export { GameWrapper };
