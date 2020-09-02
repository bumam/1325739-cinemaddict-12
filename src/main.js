import UserStatusView from "./view/user-status.js";

import FilterView from "./view/filter.js";

import FilmsAmount from "./view/films-amount.js";
import Container from "./view/container.js";

import BoardPresenter from "./presenter/board.js";
import {
  render,
  RenderPosition
} from "./utils/render.js";

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

const boardPresenter = new BoardPresenter(siteMainElement);

/*const renderCard = (filmListElement, card, comment) => {
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

  taskComponent.setOpenPopupPicClickHandler(() => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskComponent.setOpenPopupTitleClickHandler(() => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  taskComponent.setOpenPopupCommentClickHandler(() => {
    addPopup();
    document.addEventListener(`keydown`, onEscKeyDown);
  });

  filmPopup.setClosePopupClickHandler(() => {
    removePopup();
    document.removeEventListener(`keydown`, onEscKeyDown);
  });

  render(filmListElement, taskComponent, RenderPosition.BEFOREEND);
};

const renderBoard = (boardContainer, boardCards, cardComment) => {

 // render(boardContainer, new SortView(), RenderPosition.BEFOREEND);

  const boardComponent = new BoardView();
  render(boardContainer, boardComponent, RenderPosition.BEFOREEND);

 if (boardCards.length === 0) {

  render(siteMainElement, new NoFilmsView(), RenderPosition.BEFOREEND);
  } 
  else {
    const filmListComponent = new FilmListView();
    render(boardComponent, filmListComponent, RenderPosition.BEFOREEND);

    const containerComponent = new Container();
    render(filmListComponent, containerComponent, RenderPosition.BEFOREEND);

    boardCards
      .slice(0, Math.min(cards.length, CARD_COUNT_PER_STEP))
      .forEach((boardCard) => renderCard(containerComponent, boardCard, cardComment));


    if (boardCards.length > CARD_COUNT_PER_STEP) {
      let renderedCardCount = CARD_COUNT_PER_STEP;

      const loadMoreButtonComponent = new LoadMoreButtonView();

      render(filmListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

      loadMoreButtonComponent.setClickHandler(() => {

        cards
          .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
          .forEach((boardCard) => renderCard(containerComponent, boardCard, cardComment));

        renderedCardCount += CARD_COUNT_PER_STEP;

        if (renderedCardCount >= boardCards.length) {
          loadMoreButtonComponent.remove();
          loadMoreButtonComponent.removeElement();
        }
      });
    }

    render(boardComponent, new ExtraFilms(header1), RenderPosition.BEFOREEND);
    render(boardComponent, new ExtraFilms(header2), RenderPosition.BEFOREEND);

    const filmListExtraElements = document.querySelectorAll(`.films-list--extra`);

    for (let miniFilmList of filmListExtraElements) {
      const cardListExtraElement = miniFilmList.querySelector(`.films-list__container`);

      boardCards
        .slice(0, Math.min(cards.length, CARD_COUNT_MINI))
        .forEach((boardCard) => renderCard(cardListExtraElement, boardCard, cardComment));
    }

  }
};*/

render(siteHeaderElement, new UserStatusView(), RenderPosition.BEFOREEND);

render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);

render(siteFooterStatElement, new FilmsAmount(cards), RenderPosition.BEFOREEND);

//renderBoard(siteMainElement, cards, comments);
boardPresenter.init(siteMainElement, cards, comments);
