import AbstractView from "./abstract.js";

const createExtraFilmsTemplate = (header) => {
  return `<section class="films-list--extra">
  <h2 class="films-list__title">${header}</h2>
  <div class="films-list__container"></div>
 </section>
`;
};

export default class ExtraFilms extends AbstractView {

  constructor(head) {
    super();
    this._head = head;
  }

  getTemplate() {
    return createExtraFilmsTemplate(this._head);
  }
}
