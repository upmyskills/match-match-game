class BaseWorkArea {
  workArea: HTMLElement;

  constructor(
    private readonly tagName: string,
    private readonly styles: string[],
  ) {
    this.workArea = document.createElement(tagName);
    this.workArea.classList.add(...styles);
  }

  render(component: HTMLElement): void {
    this.workArea.appendChild(component);
  }

  clear():void {
    this.workArea.remove();
  }
}

export const WorkParameters = (params: string[]): string => `<p>${params}</p>`;

export { BaseWorkArea };
