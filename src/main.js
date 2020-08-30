import UserStatusView from "./view/user-status.js";
import SortView from "./view/sort.js";
import BoardView from "./view/film-board.js";
import FilmListView from "./view/film-list.js";
import LoadMoreButtonView from "./view/button-load-more.js";
import FilterView from "./view/filter.js";
import CardView from "./view/card.js";
import FilmPopupView from "./view/films-details.js";
import ExtraFilms from "./view/films-extra.js";
import FilmsAmount from "./view/films-amount.js";
import Container from "./view/container.js";
import NoFilmsView from "./view/no-films.js";

import {
  generateCard
} from "./mock/card.js";
import {
  generateComment
} from "./mock/comment.js";
import {
  generateFilters
} from "./mock/filter.js";
import {
  render,
  RenderPosition
} from "./utils.js";


const CARD_COUNT = 20;
const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_MINI = 2;

const cards = new Array(CARD_COUNT).fill().map(generateCard);

const header1 = `Top rated`;
const header2 = `Most commented`;

const filters = generateFilters(cards);

const comments = generateComment();

const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const bodyElement = document.querySelector(`body`);
const siteFooterStatElement = document.querySelector(`.footer__statistics`);

const renderCard = (filmListElement, card, comment) => {
  const taskComponent = new CardView(card);
  const filmPopup = new FilmPopupView(card, comment);

  const addPopup = () => {
    bodyElement.appendChild(filmPopup.getElement(), taskComponent.getElement());
  };

  const removePopup = () => {
    bodyElement.removeChild(filmPopup.getElement());
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === `Escape` || evt.key === `Esc`) {
      evt.preventDefault();
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    }
  };

  taskComponent.getElement().querySelector(`.film-card__poster`).addEventListener(`click`, () => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskComponent.getElement().querySelector(`.film-card__title`).addEventListener(`click`, () => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskComponent.getElement().querySelector(`.film-card__comments`).addEventListener(`click`, () => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmPopup.getElement().querySelector(`.film-details__close`).addEventListener(`click`, () => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, taskComponent.getElement(), RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardCards, cardComment) => {

  render(boardContainer, new SortView().getElement(), RenderPosition.BEFOREEND);

  const boardComponent = new BoardView();
  render(boardContainer, boardComponent.getElement(), RenderPosition.BEFOREEND);

  if (boardCards.length === 0) {

    render(siteMainElement, new NoFilmsView().getElement(), RenderPosition.BEFOREEND);
  } else {
    const filmListComponent = new FilmListView();
    render(boardComponent.getElement(), filmListComponent.getElement(), RenderPosition.BEFOREEND);

    const containerComponent = new Container();
    render(filmListComponent.getElement(), containerComponent.getElement(), RenderPosition.BEFOREEND);

    boardCards
      .slice(0, Math.min(cards.length, CARD_COUNT_PER_STEP))
      .forEach((boardCard) => renderCard(containerComponent.getElement(), boardCard, cardComment));


    if (boardCards.length > CARD_COUNT_PER_STEP) {
      let renderedCardCount = CARD_COUNT_PER_STEP;

      const loadMoreButtonComponent = new LoadMoreButtonView();

      render(filmListComponent.getElement(), loadMoreButtonComponent.getElement(), RenderPosition.BEFOREEND);

      loadMoreButtonComponent.getElement().addEventListener(`click`, (evt) => {
        evt.preventDefault();
        cards
          .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
          .forEach((boardCard) => renderCard(containerComponent.getElement(), boardCard, cardComment));

        renderedCardCount += CARD_COUNT_PER_STEP;

        if (renderedCardCount >= boardCards.length) {
          loadMoreButtonComponent.getElement().remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    }

    render(boardComponent.getElement(), new ExtraFilms(header1).getElement(), RenderPosition.BEFOREEND);
    render(boardComponent.getElement(), new ExtraFilms(header2).getElement(), RenderPosition.BEFOREEND);

    const filmListExtraElements = document.querySelectorAll(`.films-list--extra`);

    for (let miniFilmList of filmListExtraElements) {
      const cardListExtraElement = miniFilmList.querySelector(`.films-list__container`);

      boardCards
        .slice(0, Math.min(cards.length, CARD_COUNT_MINI))
        .forEach((boardCard) => renderCard(cardListExtraElement, boardCard, cardComment));
    }

  }
};

render(siteHeaderElement, new UserStatusView().getElement(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterView(filters).getElement(), RenderPosition.BEFOREEND);

render(siteFooterStatElement, new FilmsAmount(cards).getElement(), RenderPosition.BEFOREEND);

renderBoard(siteMainElement, cards, comments);
