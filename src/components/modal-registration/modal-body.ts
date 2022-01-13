import {
  BaseComponent,
  BaseBtn,
  routeTo,
  getCurrentRoute,
} from '../../shared';

import {
  ModalInput,
  InputValidStatus,
  ModalAvatar,
} from '.';

import { addUserToLocalFormData } from '../../core/services';
import { IInputField } from '../../core/models';

const INPUT_CLASS = 'form-control__input';

class ModalBody extends BaseComponent {
  formInputs: ModalInput<HTMLInputElement>[];

  constructor(
    private readonly inputs: IInputField[],
    private readonly element: ModalAvatar,
    private submitBtn: BaseBtn,
    private cancelBtn: BaseBtn,
  ) {
    super('form', ['modal-form']);

    this.formInputs = [];

    const inputsWrapper = <HTMLDivElement>document.createElement('div');
    inputsWrapper.classList.add('form-control');

    inputs.forEach((inputInstance) => {
      const input = new ModalInput(inputInstance.caption, inputInstance.type, INPUT_CLASS);
      inputsWrapper.appendChild(input.component);
      this.formInputs.push(input);
      input.component.appendChild(new InputValidStatus(input).component);

      input.component.addEventListener('input', () => {
        const validInputs = this.formInputs.filter((tag) => tag.isValid).length;
        if (validInputs === this.formInputs.length) submitBtn.getButton().disabled = false;
        else submitBtn.getButton().disabled = true;
      });
    });

    this.component.appendChild(inputsWrapper);

    this.component.appendChild(element.component);

    const div = document.createElement('div');
    div.classList.add('form-buttons');

    div.appendChild(this.submitBtn.getButton());
    div.appendChild(this.cancelBtn.getButton());
    this.component.appendChild(div);

    submitBtn.getButton().disabled = true;

    submitBtn.getButton().addEventListener('click', (event) => {
      event.preventDefault();
      if (this.isInputsValid()) this.saveToLocalstore();
      routeTo(getCurrentRoute());
      cancelBtn.getButton().click();
    });
  }

  protected isInputsValid(): boolean {
    const isValid = this.formInputs.filter((input) => input.isValid).length === this.formInputs.length;
    return isValid;
  }

  protected saveToLocalstore(): void {
    const obj = {
      firstname: (<HTMLInputElement> this.formInputs[0].component).value,
      lastname: (<HTMLInputElement> this.formInputs[1].component).value,
      email: (<HTMLInputElement> this.formInputs[2].component).value,
      img: this.element.getBlobImg(),
    };

    addUserToLocalFormData(obj);
  }
}

export { ModalBody };
