import {
  createElement
} from "../utils.js";

const createBtnShowMoreTemplate = () => {
  return `<button class="films-list__show-more">Show more</button>`;
};


export default class LoadMoreButton {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createBtnShowMoreTemplate();
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
