type TFn = () => void | string[] | HTMLInputElement[];

class BaseBtn {
  button: HTMLElement;

  constructor(
    private readonly value: string,
    private readonly styles: string[],
    private readonly tag: string = 'button',
    private readonly action?: TFn,
  ) {
    this.button = document.createElement(this.tag);
    this.button.innerText = this.value;
    this.button.classList.add(...this.styles);

    if (action) {
      this.button.addEventListener('click', (event) => {
        event?.preventDefault();
        action();
      });
    }
  }

  getButton(): HTMLButtonElement {
    return <HTMLButtonElement> this.button;
  }
}

export { BaseBtn };
