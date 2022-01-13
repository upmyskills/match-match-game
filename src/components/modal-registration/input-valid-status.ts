import { BaseComponent } from '../../shared';
import { ModalInput } from './modal-input';

class InputValidStatus extends BaseComponent {
  areaCircle: HTMLDivElement;

  statusImg: HTMLImageElement;

  isValid = false;

  constructor(private element: ModalInput<HTMLInputElement>) {
    super('div', ['input-status']);
    this.areaCircle = document.createElement('div');
    this.statusImg = document.createElement('img');
    this.component.append(this.areaCircle);
    this.component.append(this.statusImg);
    this.element = element;

    this.element.component.addEventListener('input', (): void => {
      this.checkInput();
    });
  }

  changeStatus(): void {
    this.element.isValid = true;
  }

  checkInput(): void {
    if (this.element.caption === 'First Name' || this.element.caption === 'Last Name') {
      this.checkName();
    } else if (this.element.caption === 'E-mail') this.checkEmail();
  }

  protected checkName(): void {
    let status = true;
    this.element.component.classList.remove('success-status', 'error-status');
    if ((<HTMLInputElement> this.element.component).value === '') status = false;
    if ((<HTMLInputElement> this.element.component).value.match(/[~!@#$%*()_—+=|:;"'`< >,.?/^]/)?.length) {
      status = false;
    }
    if ((<HTMLInputElement> this.element.component).value.match(/^[\d]+$/)?.length) status = false;
    if ((<HTMLInputElement> this.element.component).value.length > 30) status = false;

    if (status) {
      this.element.component.classList.add('success-status');
    } else this.element.component.classList.add('error-status');

    this.element.setValid(status);
  }

  protected checkEmail(): void {
    this.element.component.classList.remove('success-status', 'error-status');
    const regTemplate = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.([a-zA-Z0-9_-]){2,3}$)/gi;
    if ((<HTMLInputElement> this.element.component).value.match(regTemplate)?.length) {
      this.element.component.classList.add('success-status');
      this.element.setValid(true);
    } else {
      this.element.component.classList.add('error-status');
      this.element.setValid(false);
    }
  }
}

export { InputValidStatus };
