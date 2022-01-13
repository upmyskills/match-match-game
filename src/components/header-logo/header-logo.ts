import './header-logo.scss';

class HeaderLogo {
  private logo: HTMLDivElement;

  constructor() {
    this.logo = document.createElement('div');
  }

  drawLogo(): HTMLDivElement {
    const upperMatch = document.createElement('div');
    const lowerMatch = document.createElement('div');

    upperMatch.innerText = 'MATCH';
    lowerMatch.innerText = 'MATCH';

    upperMatch.classList.add('logo-upper');
    lowerMatch.classList.add('logo-lower');

    this.logo.classList.add('header-logo');

    this.logo.appendChild(upperMatch);
    this.logo.appendChild(lowerMatch);

    return this.logo;
  }
}

export default HeaderLogo;
