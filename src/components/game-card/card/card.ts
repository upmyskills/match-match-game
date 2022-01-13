import { BaseComponent, BaseImg } from '../../../shared';
import './card.scss';

const FLIP_CLASS = 'flipped';

class Card extends BaseComponent {
  frontside: BaseComponent;

  backside: BaseComponent;

  image: BaseImg;

  isFlipped = true;

  card: BaseComponent;

  constructor(readonly imagePath: string) {
    super('div', ['card-container']);
    this.frontside = new BaseComponent('div', ['card__front']);
    this.backside = new BaseComponent('div', ['card__back']);
    this.card = new BaseComponent('div', ['card']);

    // this.image = document.createElement('img');
    this.image = new BaseImg(imagePath, 'match-match card', ['card-front__image']);
    // this.image.src = imagePath;

    this.frontside.component.appendChild(this.image.getCardImage());
    this.card.component.appendChild(this.frontside.component);
    this.card.component.appendChild(this.backside.component);

    this.component.appendChild(this.card.component);
  }

  getImageSource(): string {
    return this.image.componentImg.src;
  }

  flipToBack(): Promise<void> {
    this.isFlipped = false;
    return this.flip(true);
  }

  flipToFront(): Promise<void> {
    this.isFlipped = true;
    return this.flip();
  }

  private flip(isFront = false): Promise<void> {
    return new Promise((resolve) => {
      this.card.component.classList.toggle(FLIP_CLASS, isFront);
      this.component.addEventListener('transitionend', () => resolve(), {
        once: true,
      });
    });
  }
}

export { Card };
