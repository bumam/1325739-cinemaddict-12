import {
  createUserStatusTemplate
} from "./view/user-status.js";
import {
  createSiteMenuTemplate
} from "./view/menu.js";
import {
  createFilmCardTemplate
} from "./view/card.js";
import {
  createBtnShowMoreTemplate
} from "./view/button-load-more.js";
import {
  createFilmsAmountTemplate
} from "./view/films-amount.js";

const TASK_COUNT = 5;
const TASK_COUNT_MINI = 2;

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserStatusTemplate(), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);
const taskListElement = boardElement.querySelector(`.films-list__container`);

for (let i = 0; i < TASK_COUNT; i++) {
  render(taskListElement, createFilmCardTemplate(), `beforeend`);
}

const filmListElement = boardElement.querySelector(`.films-list`);

render(filmListElement, createBtnShowMoreTemplate(), `beforeend`);

const filmListExtraElements = boardElement.querySelectorAll(`.films-list--extra`);

for (let miniFilmList of filmListExtraElements) {
  const taskListExtraElement = miniFilmList.querySelector(`.films-list__container`);
  for (let i = 0; i < TASK_COUNT_MINI; i++) {
    render(taskListExtraElement, createFilmCardTemplate(), `beforeend`);
  }
}

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

render(footerStat, createFilmsAmountTemplate(), `beforeend`);
