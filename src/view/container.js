import AbstractView from "./abstract.js";

const createContainerTemplate = () => {
  return `<div class="films-list__container"></div>`;
};

export default class Container extends AbstractView {

  getTemplate() {
    return createContainerTemplate();
  }

}
