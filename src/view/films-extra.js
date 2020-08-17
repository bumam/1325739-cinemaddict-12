import {
  createElement
} from "../utils.js";

const createExtraFilmsTemplate = (header) => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${header}</h2>
  <div class="films-list__container"></div>
 </section>
`;
};

export default class ExtraFilms {
  constructor(header) {
    this._head = header;
    this._element = null;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._head);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
