import { BaseComponent, BaseSelect } from '../shared';
import { SelectLabel } from '../components/game-settings';
import { IOptions } from '../core/models/game-options-model';

export class GameSettingsPage extends BaseComponent {
  private selectComponents: BaseSelect[] = [];

  constructor(private readonly configPath: string) {
    super('div', ['game-config']);
    this.configPath = configPath;
    this.createConfigSelect();
  }

  async createConfigSelect(): Promise<void> {
    const data = await fetch(this.configPath);
    const res = await data.json();

    Object.keys(res).forEach((el) => {
      const selectOptions: string[] = [];

      res[el].forEach((opt: IOptions) => {
        selectOptions.push(opt.option);
      });

      const select = new BaseSelect(el, selectOptions);
      const label = new SelectLabel(select);

      this.component.appendChild(label.label.component);
      this.selectComponents.push(select);
    });
  }

  getSelectComponents(): BaseSelect[] {
    return this.selectComponents;
  }

  getDifficulty(): string {
    let res = '';
    this.selectComponents.forEach((select) => {
      if (select.componentName === 'difficulty') {
        res = select.getValue();
      }
    });
    return res;
  }

  getCategory(): string {
    let res = '';
    this.selectComponents.forEach((select) => {
      if (select.componentName === 'category') {
        res = select.getValue();
      }
    });
    return res;
  }
}
