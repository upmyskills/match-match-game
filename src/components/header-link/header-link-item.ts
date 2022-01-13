import './header-link.scss';
import { BaseLink } from '../../shared';
import { BaseLinks } from '../../core/models';
import { HEADER_LINKS } from '../../core/const';

class HeaderLinkItem {
  private readonly links: BaseLinks[];

  linkField: HTMLUListElement;

  constructor() {
    this.links = HEADER_LINKS;
    this.linkField = document.createElement('ul');
    this.linkField.classList.add('header-menu');
  }

  setLinksToHeader(styles: string[]): HTMLUListElement {
    this.links.forEach((link) => {
      const liElement: HTMLLIElement = document.createElement('li');
      liElement.classList.add(...styles);
      liElement.appendChild(new BaseLink(link).render());
      this.linkField.appendChild(liElement);
    });

    return this.linkField;
  }
}

export default HeaderLinkItem;
