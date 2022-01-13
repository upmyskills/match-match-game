import shuffle from 'lodash/shuffle';

import { FLIP_DELAY } from '../core/const';
import { BaseComponent, delay, countCards } from '../shared';
import { endGame } from '../core/game-core';
import { pushResultToDB } from '../core/services';
import {
  Card,
  CountDownTimer,
  GameWrapper,
  ModalGraciasWrapper,
} from '../components';

export class PlayGamePage extends BaseComponent {
  private readonly cardsField: GameWrapper;

  private gameStarted = new Date();

  private findPairs = 0;

  private moves = 0;

  private wrongMoves = 0;

  private activeCard?: Card;

  private isAnimation = false;

  constructor(
    private readonly allPairs: string[],
    private difficulty?: string,
  ) {
    super('div', ['game']);
    this.cardsField = new GameWrapper();
    this.component.appendChild(this.cardsField.component);
    this.component.appendChild(new CountDownTimer().component);
  }

  startGame(images: string[]): void {
    this.cardsField.clear();
    const cards = shuffle(images.concat(images).map((url) => new Card(url)));

    cards.forEach((card) => {
      card.component.addEventListener('click', () => this.cardHandler(card));
    });

    this.cardsField.addCards(cards);
  }

  private async cardHandler(card: Card): Promise<void> {
    if (this.isAnimation || card.isFlipped) return;
    card.isFlipped = true;
    this.isAnimation = true;
    await card.flipToFront();

    if (!this.activeCard) {
      this.activeCard = card;
    } else {
      await this.isEquil(card);
      this.activeCard = undefined;
    }

    this.isAnimation = false;
  }

  protected async isEquil(srcTwo: Card): Promise<void> {
    if (!this.activeCard) return;
    this.moves++;
    if (this.activeCard.getImageSource() !== srcTwo.getImageSource()) {
      this.wrongMoves++;
      [this.activeCard, srcTwo].forEach((item) => item.card.component.classList.add('wrong'));
      await delay(FLIP_DELAY);
      [this.activeCard, srcTwo].forEach((item) => {
        item.flipToBack();
        item.card.component.classList.remove('wrong');
      });
    } else {
      [this.activeCard, srcTwo].forEach((item) => item.card.component.classList.add('correct'));
      this.findPairs++;
    }
    this.checkGameStatus();
  }

  protected checkGameStatus(): void {
    if (this.findPairs === this.allPairs.length) {
      const points = this.calculateScore();
      const playerData = endGame(points, this.difficulty);
      new ModalGraciasWrapper(Number(playerData.score)).createModal();
      pushResultToDB(playerData);
    }
  }

  protected calculateScore(): number {
    const gameLenght: number = new Date().getTime() - this.gameStarted.getTime();
    const points = ((this.moves - this.wrongMoves) * 100) - (gameLenght / 100);
    return (points > 0) ? points : 0;
  }

  async setGridTemplate(difficulty: string): Promise<void> {
    this.difficulty = difficulty;
    this.cardsField.component.classList.remove('odd', 'even');
    const isCardsAliquot = (await countCards(difficulty) * 2) % 4 === 0;
    if (isCardsAliquot) {
      this.cardsField.component.classList.add('even');
    } else {
      this.cardsField.component.classList.add('odd');
    }
  }
}
