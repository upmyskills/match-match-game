import { BaseComponent } from '../../shared';

class ModalGraciasWindow extends BaseComponent {
  constructor() {
    super('div', ['modal-gracias']);
  }

  createWindow(score: number): void {
    const modalHeader = new BaseComponent('h2', ['modal-header']);
    const modalScore = new BaseComponent('p', ['modal-score']);

    modalHeader.component.innerText = 'Congratulation!';
    modalScore.component.innerText = `You score: ${score > 0 ? score : 0}`;

    this.component.appendChild(modalHeader.component);
    this.component.appendChild(modalScore.component);
  }
}

export { ModalGraciasWindow };
