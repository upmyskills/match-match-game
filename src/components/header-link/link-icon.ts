class LinkIcon {
  private iconElement: HTMLImageElement;

  constructor(
    private readonly path: string,
    private readonly altInfo: string,
    private readonly styles: string[],
  ) {
    this.iconElement = document.createElement('img');
    this.path = path;
    this.altInfo = altInfo;
    this.styles = styles;

    this.iconElement.classList.add(...styles);
    this.iconElement.src = this.path;
    this.iconElement.alt = this.altInfo;
  }

  render(): HTMLImageElement {
    return this.iconElement;
  }
}

export default LinkIcon;
