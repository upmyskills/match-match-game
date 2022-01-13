import { BaseLinks } from '../../core/models';
import LinkIcon from '../../components/header-link/link-icon';

class BaseLink {
  name: string;

  icon: string;

  href: string;

  constructor(
    links: BaseLinks,
  ) {
    this.name = links.name;
    this.href = links.href;
    this.icon = links.icon;
  }

  render(): HTMLElement {
    const clearAllActiveStyle = (style: string): void => {
      const allActive = document.querySelectorAll(`.${style}`);
      allActive.forEach((item) => item.classList.remove(`${style}`));
    };

    const activStyle = 'active-menu-link';

    const link: HTMLAnchorElement = document.createElement('a');
    const p: HTMLParagraphElement = document.createElement('p');
    const linkIcon: HTMLImageElement = new LinkIcon(this.icon, this.name, ['header-link-icon']).render();

    p.innerText = this.name;

    link.appendChild(linkIcon);
    link.appendChild(p);

    link.classList.add('menu-link');
    link.href = this.href;

    if (this.name === 'About Game') link.classList.add(activStyle);

    link.addEventListener('click', () => {
      clearAllActiveStyle(activStyle);
      link.parentElement?.classList.add(activStyle);
    });

    return link;
  }
}

export { BaseLink };
