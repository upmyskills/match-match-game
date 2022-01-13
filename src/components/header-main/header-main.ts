import './header.scss';
import HeaderLinks from '../header-link/header-link-item';
import HeaderLogo from '../header-logo/header-logo';
import { HeaderButton } from '../header-button/header-button';

export class HeaderMain {
  headerContainer: HTMLElement;

  button = new HeaderButton();

  constructor(private readonly styles: string[]) {
    this.headerContainer = document.createElement('nav');
    this.headerContainer.classList.add(...styles);
    this.headerContainer.appendChild(new HeaderLogo().drawLogo());
    this.headerContainer.appendChild(new HeaderLinks().setLinksToHeader(['header-menu__item']));
    this.headerContainer.appendChild(this.button.getButton());
  }

  updateBtn(): void {
    this.button.update();
  }
}
