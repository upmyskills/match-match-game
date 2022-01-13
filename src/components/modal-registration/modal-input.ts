import { BaseComponent } from '../../shared';

class ModalInput<T extends HTMLInputElement> extends BaseComponent {
  isValid: boolean;

  caption: string;

  constructor(
    caption: string,
    private type: string,
    private style: string,
  ) {
    super('input', [style]);
    this.caption = caption;
    (<T> this.component).name = caption;
    (<T> this.component).type = type;
    (<T> this.component).placeholder = caption;
    this.isValid = false;
  }

  setValid(value: boolean): void {
    this.isValid = value;
  }
}

export { ModalInput };
