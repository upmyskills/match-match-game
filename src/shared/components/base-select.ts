import { BaseComponent } from './base-component';

class BaseSelect {
  private currentOption = '';

  componentName = '';

  select: BaseComponent;

  constructor(
    private readonly caption: string,
    private readonly options: string[],
    private readonly values?: string[],
  ) {
    this.select = new BaseComponent('select', ['select-input']);
    const defOption = <HTMLOptionElement>document.createElement('option');
    this.caption = caption;
    this.componentName = caption;
    this.select.component.setAttribute('name', caption);

    defOption.selected = true;
    defOption.disabled = true;
    defOption.value = caption;
    defOption.innerText = `Select ${caption}`;

    this.select.component.appendChild(defOption);

    options.forEach((opt) => {
      const option = <HTMLOptionElement>document.createElement('option');
      option.value = opt;
      option.innerText = opt;
      this.select.component.appendChild(option);
    });

    [this.currentOption] = options;

    this.select.component.addEventListener('change', (): void => {
      this.currentOption = (<HTMLInputElement> this.select.component).value;
    });
  }

  getComponentCaption(): string {
    return this.caption;
  }

  getValue(): string {
    return this.currentOption;
  }
}

export { BaseSelect };
