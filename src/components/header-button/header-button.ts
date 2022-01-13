import { BaseBtn, routeTo } from '../../shared';
import { getUser } from '../../core/services/authenticate-user';
import { ModalWrapper } from '../modal-registration/modal-wrapper';
import './header-button.scss';

class HeaderButton extends BaseBtn {
  modal?: ModalWrapper | null;

  constructor() {
    super('Register new player', ['header-button']);

    this.chooseName();

    this.getButton().addEventListener('click', () => {
      if (getUser()) this.startNewGame();
      else this.showModal();
    });

    this.modal = null;
  }

  update(): void {
    this.chooseName();
  }

  chooseName(): void {
    if (getUser()) {
      this.getButton().innerText = 'Start new game!';
    } else {
      this.getButton().innerText = 'Register new player';
    }
  }

  startNewGame(): void {
    this.modal = null;
    routeTo('game');
  }

  showModal(): void {
    this.modal = new ModalWrapper();
    const root = document.getElementById('root');
    root?.classList.add('freez');
    root?.append(this.modal.component);
  }
}

export { HeaderButton };
