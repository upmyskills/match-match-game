import { BaseComponent, BaseBtn } from '../../shared';
import { ModalRegistration, ModalAvatar, ModalTitle } from '.';
import { ModalBody } from './modal-body';

import { INPUTS } from '../../core/const';
import './modal-registration.scss';

class ModalWrapper extends BaseComponent {
  constructor() {
    super('div', ['modal-wrapper']);
    this.component.addEventListener('mousedown', (event): void => {
      if (event.target === this.component) {
        this.close();
      }
    });

    const modalTitle = new ModalTitle('Registr new Player');
    const avatar = new ModalAvatar();
    const submitBtn = new BaseBtn('Submit', ['btn-submit']);
    const cancelBtn = new BaseBtn('Cancel', ['btn-cancel'], 'button', () => this.close());
    const modalBody = new ModalBody(INPUTS, avatar, submitBtn, cancelBtn);

    const registration = new ModalRegistration([
      modalTitle.component,
      modalBody.component,
    ]);

    this.component.append(registration.component);
  }

  close(): void {
    this.component.parentElement?.classList.remove('freez');
    this.component.remove();
  }
}

export { ModalWrapper };
