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
import {
  getFilmsDetailsTemplate
} from './view/films-details.js';
import {
  generateCard
} from "./mock/card.js";
import {
  generateComment
} from "./mock/comment.js";
import {
  generateFilters
} from "./mock/filter.js";

const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_MINI = 2;

const cards = new Array(CARD_COUNT).fill().map(generateCard);

const render = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

const filters = generateFilters(cards);


const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);

render(siteHeaderElement, createUserStatusTemplate(), `beforeend`);

render(siteMainElement, createSiteMenuTemplate(filters), `beforeend`);

const boardElement = siteMainElement.querySelector(`.films`);
const cardListElement = boardElement.querySelector(`.films-list__container`);

for (let i = 0; i < Math.min(cards.length, CARD_COUNT_PER_STEP); i++) {
  render(cardListElement, createFilmCardTemplate(cards[i]), `beforeend`);
}

const filmListElement = boardElement.querySelector(`.films-list`);

if (cards.length > CARD_COUNT_PER_STEP) {
  let renderedTaskCount = CARD_COUNT_PER_STEP;

  render(filmListElement, createBtnShowMoreTemplate(), `beforeend`);

  const loadMoreButton = boardElement.querySelector(`.films-list__show-more`);

  loadMoreButton.addEventListener(`click`, (evt) => {
    evt.preventDefault();
    cards
      .slice(renderedTaskCount, renderedTaskCount + CARD_COUNT_PER_STEP)
      .forEach((card) => render(cardListElement, createFilmCardTemplate(card), `beforeend`));

    renderedTaskCount += CARD_COUNT_PER_STEP;

    if (renderedTaskCount >= cards.length) {
      loadMoreButton.remove();
    }
  });

}

const filmListExtraElements = boardElement.querySelectorAll(`.films-list--extra`);

for (let miniFilmList of filmListExtraElements) {
  const cardListExtraElement = miniFilmList.querySelector(`.films-list__container`);
  for (let i = 0; i < CARD_COUNT_MINI; i++) {
    render(cardListExtraElement, createFilmCardTemplate(cards[i]), `beforeend`);
  }
}

const footer = document.querySelector(`.footer`);
const footerStat = footer.querySelector(`.footer__statistics`);

render(footerStat, createFilmsAmountTemplate(cards), `beforeend`);

render(footer, getFilmsDetailsTemplate(cards[0], generateComment()), `afterend`);

const posters = boardElement.querySelectorAll(`.film-card__poster`);
const titles = boardElement.querySelectorAll(`.film-card__title`);
const comments = boardElement.querySelectorAll(`.film-card__comments`);

const popup = document.querySelector(`.film-details`);
const popupClose = popup.querySelector(`.film-details__close-btn`);


const showPopup = (element) => {
  element.style.display = `block`;
};

const hidePopup = (element) => {
  element.style.display = `none`;
};

popupClose.addEventListener(`click`, () => {
  showPopup(popup);
});

for (let poster of posters) {
  poster.addEventListener(`click`, () => {
    hidePopup(popup);
  });
}

for (let title of titles) {
  title.addEventListener(`click`, () => {
    showPopup(popup);
  });
}

for (let comment of comments) {
  comment.addEventListener(`click`, () => {
    hidePopup(popup);
  });
}
