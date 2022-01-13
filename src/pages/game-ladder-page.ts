import { BaseComponent } from '../shared';
import { BASE_URL } from '../core/const';
import { openConnection, getSortedResults } from '../core/services';

import './ladder-page.scss';

class GameLadderPage extends BaseComponent {
  addResults = new BaseComponent('ul', ['table-result']);

  constructor() {
    super('div', ['ladder']);

    this.component.appendChild(this.addResults.component);
  }

  createTableHeader(): void {
    const li = new BaseComponent('li', ['table-result__header']);
    const liPosition = new BaseComponent('div', ['table-result__item-field']);
    const liAva = new BaseComponent('div', ['table-result__item-field']);
    const liLogin = new BaseComponent('div', ['table-result__item-field']);
    const liScore = new BaseComponent('div', ['table-result__item-field']);
    const liMode = new BaseComponent('div', ['table-result__item-field']);

    liPosition.component.innerText = '#';
    liAva.component.innerText = '---';
    liLogin.component.innerText = 'Name';
    liScore.component.innerText = 'Score';
    liMode.component.innerText = 'Difficulty';

    li.component.appendChild(liPosition.component);
    li.component.appendChild(liAva.component);
    li.component.appendChild(liLogin.component);
    li.component.appendChild(liScore.component);
    li.component.appendChild(liMode.component);

    this.addResults.component.appendChild(li.component);
  }

  async getResults(): Promise<void> {
    try {
      await openConnection();

      const res = await getSortedResults();
      const isResults = res.length > 0;

      if (!isResults) {
        this.addResults.component.innerText = `
        Nothing to show!\n
        IndexedDB is empty!\n
        Play some games please!`;
      } else {
        this.createTableHeader();
      }

      res.forEach((item, index) => {
        const li = new BaseComponent('li', ['table-result__item']);
        const str = JSON.stringify(item);
        const obj = JSON.parse(str);

        const id = new BaseComponent('div', ['table-result__item-field']);
        id.component.innerText = `${index + 1}`;
        li.component.appendChild(id.component);

        const avaWrap = new BaseComponent('div', ['table-result__item-imgfield']);
        const ava = new BaseComponent('img', ['table-result__item-img']);
        const isImage = !!obj.image;
        (ava.component as HTMLInputElement).src = !isImage
          ? `${BASE_URL}imgs/avatar.png` : `data:image/*;base64, ${obj.image}`;
        avaWrap.component.appendChild(ava.component);
        li.component.appendChild(avaWrap.component);

        Object.keys(obj).forEach((field: string) => {
          const isNotNeed = field === 'id' || field === 'image';
          if (isNotNeed) return;
          const div = new BaseComponent('div', ['table-result__item-field']);
          div.component.innerText = `${obj[field]}`;
          li.component.appendChild(div.component);
        });

        this.addResults.component.appendChild(li.component);
      });
    } catch (err) {
      const errorMsg = new BaseComponent('p', ['error-message']);
      errorMsg.component.innerText = '500 error, try letter';
      this.addResults.component.appendChild(errorMsg.component);
    }
  }
}

export { GameLadderPage };
