import { BaseComponent, routeTo } from '../../shared';
import { ModalGraciasWindow } from './modal-gracias-window';

import './modal-gracias.scss';

class ModalGraciasWrapper extends BaseComponent {
  constructor(private readonly score: number) {
    super('div', ['modal-gracias-wrapper']);
    const window = new ModalGraciasWindow();
    window.createWindow(score);

    this.component.appendChild(window.component);

    this.component.addEventListener('mousedown', () => this.close());
  }

  protected close(): void {
    this.component.remove();
    routeTo('ladder');
  }

  createModal(): void {
    document.querySelector('#root')?.append(this.component);
  }
}

export { ModalGraciasWrapper };
