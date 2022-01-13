import { BaseComponent } from '../../shared';

class ModalTitle extends BaseComponent {
  element: HTMLElement;

  constructor(
    private title: string,
  ) {
    super('div', ['modal-title']);
    this.element = document.createElement('h2');
    this.element.innerText = title;
    this.component.append(this.element);
  }
}

export { ModalTitle };
