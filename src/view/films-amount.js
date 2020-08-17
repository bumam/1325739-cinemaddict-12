import {
  createElement
} from "../utils.js";

const createFilmsAmountTemplate = (films) => {

  return `<section class="footer__statistics">
     <p>${films.length} movies inside</p>
</section>`;
};


export default class FilmsAmount {
  constructor(films) {
    this._amount = films;
    this._element = null;
  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
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
