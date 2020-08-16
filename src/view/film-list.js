import {
  createElement
} from "../utils.js";

const createTaskListTemplate = () => {
  return `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      </section>`;
};

export default class TaskList {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createTaskListTemplate();
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
