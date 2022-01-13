class BaseImg {
  component: HTMLDivElement;

  componentImg: HTMLImageElement;

  constructor(
    private readonly img: string,
    private readonly alt: string,
    private readonly styles: string[],
  ) {
    this.component = document.createElement('div');
    this.componentImg = document.createElement('img');
    this.component.classList.add(...styles);
    this.componentImg.alt = alt;
    this.componentImg.src = img;
    this.component.appendChild(this.componentImg);
  }

  getCardImage(): HTMLImageElement {
    return this.componentImg;
  }

  render(): HTMLElement {
    return this.component;
  }
}

export { BaseImg };
