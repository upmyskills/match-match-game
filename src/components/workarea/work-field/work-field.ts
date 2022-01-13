import './workarea.scss';

import { BaseWorkArea } from '../../../shared';

class WorkField extends BaseWorkArea {
  constructor(private readonly component?: HTMLElement) {
    super('div', ['workarea']);
    this.component = component;

    if (this.component) {
      this.workArea.appendChild(this.component);
    }
  }
}

export { WorkField };
