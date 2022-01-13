import './game-settings.scss';
import { BaseComponent } from '../../shared';
import { BaseSelect } from '../../shared/components/base-select';

class SelectLabel {
  label: BaseComponent;

  constructor(private readonly selectClass: BaseSelect) {
    this.label = new BaseComponent('div', ['select-label']);
    const header = document.createElement('h2');
    const caption = selectClass.getComponentCaption();

    header.innerText = caption;
    this.label.component.appendChild(header);
    this.label.component.appendChild(selectClass.select.component);
  }
}

export { SelectLabel };
