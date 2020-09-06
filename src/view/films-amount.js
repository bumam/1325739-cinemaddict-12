import AbstractView from "./abstract.js";

const createFilmsAmountTemplate = (films) => {

  return `<section class="footer__statistics">
     <p>${films.length} movies inside</p>
</section>`;
};


export default class FilmsAmount extends AbstractView {
  constructor(films) {
    super();
    this._amount = films;

  }

  getTemplate() {
    return createFilmsAmountTemplate(this._amount);
  }

}
