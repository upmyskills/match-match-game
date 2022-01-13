import { BaseComponent } from '../../shared';

class ModalAvatar extends BaseComponent {
  private button: HTMLInputElement;

  private img = new BaseComponent('img', ['avatara']);

  private blobImg = '';

  constructor() {
    super('div', ['modal-avatar']);
    this.button = document.createElement('input');
    this.button.type = 'file';
    this.button.name = 'file';
    this.button.setAttribute('accept', 'image/*');

    this.component.appendChild(this.img.component);

    this.component.addEventListener('click', (): void => {
      this.button.click();
    });

    this.button.addEventListener('change', () => this.getFile());
  }

  getBlobImg(): string {
    return this.blobImg;
  }

  getFile(): void {
    if (!this.button.files) return;
    const file = this.button.files[0] || null;

    const reader = new FileReader();
    reader.readAsBinaryString(file);

    reader.onload = (e) => {
      const bits = e.target?.result;
      this.blobImg = btoa(bits as string);
      (this.img.component as HTMLImageElement).src = `data:image/*;base64, ${btoa(bits as string)}`;
    };
  }
}

export { ModalAvatar };
