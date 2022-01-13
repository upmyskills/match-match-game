class BaseTitle {
  header: HTMLElement;

  constructor(
    private readonly parentElement: HTMLElement,
    private readonly title: string,
    private readonly styles: string[],
  ) {
    this.header = document.createElement('h2');
    this.header.textContent = title;
    this.header.classList.add(...styles);
    parentElement.appendChild(this.header);
  }
}

export { BaseTitle };
