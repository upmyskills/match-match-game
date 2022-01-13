class BaseComponent {
  component: HTMLElement;

  constructor(
    private readonly tag: keyof HTMLElementTagNameMap,
    private readonly styles: string[],
  ) {
    this.component = document.createElement(tag);
    this.component.classList.add(...styles);
  }
}

export { BaseComponent };
