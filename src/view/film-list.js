import AbstractView from "./abstract.js";

const createTaskListTemplate = () => {
  return `<section class="films-list">
  <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>

      </section>`;
};

export default class TaskList extends AbstractView {

  getTemplate() {
    return createTaskListTemplate();
  }

}
