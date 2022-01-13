import { BaseComponent } from '../../shared';
import { DEFAULT_COUNTDOWN } from '../../core/const';
import './game-timer.scss';

class CountDownTimer extends BaseComponent {
  text: BaseComponent;

  constructor(private seconds: number = DEFAULT_COUNTDOWN) {
    super('div', ['game-timer']);
    this.startTimer(() => {});
    this.text = new BaseComponent('p', ['countdow']);
    this.text.component.innerText = `00:${DEFAULT_COUNTDOWN.toString()}`;
    this.component.appendChild(this.text.component);
  }

  startTimer(fn: () => void): void {
    const time = setInterval(() => {
      this.text.component.innerText = (this.seconds < DEFAULT_COUNTDOWN + 1)
        ? `00:0${--this.seconds}`
        : `00:${--this.seconds}`;

      if (this.seconds < 0) {
        clearInterval(time);
        this.destroy();
        fn();
      }
    }, 1000);
  }

  destroy(): void {
    this.component.remove();
  }
}

export { CountDownTimer };
