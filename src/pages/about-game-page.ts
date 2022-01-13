import {
  GameCard,
  CardNumber,
  CardText,
} from '../components';
import { STEPS } from '../core/const';
import { BaseComponent, BaseImg } from '../shared';

class AboutGamePage extends BaseComponent {
  constructor() {
    super('div', ['how-to-play']);

    STEPS.forEach((step) => {
      const card = new GameCard('div', ['how-to-play__card']);
      new CardNumber(step.step, ['how-to-play__card-number']).addToParent(card);
      new CardText(step.text, ['how-to-play__card-text']).addToParent(card);
      this.component.append(card.render());
      const img = new BaseImg(step.imagepath, step.imagealt, ['how-to-play__image']);
      this.component.append(img.render());
    });
  }
}

export { AboutGamePage };
