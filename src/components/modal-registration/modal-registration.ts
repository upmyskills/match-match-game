import { BaseComponent } from '../../shared';

class ModalRegistration extends BaseComponent {
  constructor(
    private readonly elements: HTMLElement[],
  ) {
    super('div', ['modal-registration']);
    elements.forEach((element) => {
      this.component.append(element);
    });
  }
}

export { ModalRegistration };
