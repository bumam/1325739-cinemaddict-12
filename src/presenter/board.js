import BoardView from "../view/film-board.js";
import SortView from "../view/sort.js";
import FilmListView from "../view/film-list.js";
import NoFilmsView from "../view/no-films.js";
import CardView from "../view/card.js";
import FilmPopupView from "../view/films-details.js";
import LoadMoreButtonView from "../view/button-load-more.js";
import Container from "../view/container.js";
import ExtraFilms from "../view/films-extra.js";

import {
  sortRating,
  sortCardDown,
  SortType
} from "../const.js";
import {
  render,
  RenderPosition
} from "../utils/render.js";

const CARD_COUNT_PER_STEP = 5;
const CARD_COUNT_MINI = 2;

const header1 = `Top rated`;
const header2 = `Most commented`;

export default class Board {
  constructor(boardContainer) {
    this._currentSortType = SortType.DEFAULT;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
    this._boardContainer = boardContainer;
    this._boardComponent = new BoardView();
    this._sortComponent = new SortView();
    this._filmListComponent = new FilmListView();
    this._noFilmComponent = new NoFilmsView();
    this._containerComponent = new Container();
    this._loadMoreButtonComponent = new LoadMoreButtonView();
    this._handleSortTypeChange = this._handleSortTypeChange.bind(this);
  }

  init(cards, comments) {
    this._boardFilms = cards.slice();
    this._sourcedBoardCards = cards.slice();
    this._renderSort();
    render(this._boardContainer, this._boardComponent, RenderPosition.BEFOREEND); // board
    render(this._filmListComponent, this._containerComponent, RenderPosition.BEFOREEND); // films-list container

    this._renderBoard(comments);
  }

  _sortCards(sortType) {
    switch (sortType) {
      case SortType.RATING:
        this._boardFilms.sort(sortRating);
        break;
      case SortType.DATE_DOWN:
        this._boardFilms.sort(sortCardDown);
        break;
      default:
        this._boardFilms = this._sourcedBoardCards.slice();
    }
    this._currentSortType = sortType;
  }

  _renderCard(filmListElement, comment, card) {
    const cardComponent = new CardView(card);
    const filmPopup = new FilmPopupView(card, comment);
    const bodyElement = document.querySelector(`body`);

    const addPopup = () => {
      bodyElement.appendChild(
        filmPopup.getElement(),
        cardComponent.getElement()
      );
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

    cardComponent.setOpenPopupPicClickHandler(() => {
      addPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    cardComponent.setOpenPopupTitleClickHandler(() => {
      addPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    cardComponent.setOpenPopupCommentClickHandler(() => {
      addPopup();
      document.addEventListener(`keydown`, onEscKeyDown);
    });

    filmPopup.setClosePopupClickHandler(() => {
      removePopup();
      document.removeEventListener(`keydown`, onEscKeyDown);
    });

    render(filmListElement, cardComponent, RenderPosition.BEFOREEND);
    // созданиt и рендеринг
  }

  _handleSortTypeChange(sortType, comments) {
    if (this._currentSortType === sortType) {
      return;
    }

    this._sortCards(sortType);
    this._clearFllmList();
    this._renderFilmList(comments);
  }

  _renderSort() {
    render(this._boardContainer, this._sortComponent, RenderPosition.BEFOREEND);
    this._sortComponent.setSortTypeChangeHandler(this._handleSortTypeChange);
  }

  _clearFllmList() {
    this._filmListComponent.getElement().innerHTML = ``;
    this._renderedCardCount = CARD_COUNT_PER_STEP;
  }

  _renderCards(from, to, comments) {
    // Метод для рендеринга N-задач за раз
    this._boardFilms
      .slice(from, to)
      .forEach((boardCard) =>
        this._renderCard(this._containerComponent, comments, boardCard)
      );
  }

  _renderNoFilms() {
    // Метод для рендеринга заглушки
    render(this._boardComponent, new NoFilmsView(), RenderPosition.BEFOREEND);
  }

  _renderExtraFilms(comments) {
    render(
      this._boardComponent,
      new ExtraFilms(header1),
      RenderPosition.BEFOREEND
    );
    render(
      this._boardComponent,
      new ExtraFilms(header2),
      RenderPosition.BEFOREEND
    );

    const filmListExtraElements = document.querySelectorAll(
      `.films-list--extra`
    );

    for (let miniFilmList of filmListExtraElements) {
      const cardListExtraElement = miniFilmList.querySelector(
        `.films-list__container`
      );

      this._boardFilms
        .slice(0, Math.min(this._boardFilms.length, CARD_COUNT_MINI))
        .forEach((boardCard) =>
          this._renderCard(cardListExtraElement, comments, boardCard)
        );
    }
  }

  _renderLoadMoreButton(comments) {
    let renderedCardCount = CARD_COUNT_PER_STEP;
    const loadMoreButtonComponent = new LoadMoreButtonView();

    render(this._filmListComponent, loadMoreButtonComponent, RenderPosition.BEFOREEND);

    loadMoreButtonComponent.setClickHandler(() => {
      this._boardFilms
        .slice(renderedCardCount, renderedCardCount + CARD_COUNT_PER_STEP)
        .forEach((boardCard) =>
          this._renderCard(this._containerComponent, comments, boardCard)
        );
      renderedCardCount += CARD_COUNT_PER_STEP;
      if (renderedCardCount >= this._boardFilms.length) {
        loadMoreButtonComponent.remove();
        loadMoreButtonComponent.removeElement();
      }

    });
  }

  _renderFilmList(comments) {
    console.log(comments)
    this._renderCards(0, Math.min(this._boardFilms.length, CARD_COUNT_PER_STEP), comments);

    if (this._boardFilms.length > CARD_COUNT_PER_STEP) {
      this._renderLoadMoreButton(comments);
    }
  }

  _renderBoard(comments) {
    // Метод для инициализации (начала работы) модуля,
    // бОльшая часть текущей функции renderBoard в main.js
    if (this._boardFilms.length === 0) {
      this._renderNoFilms();
      return;
    }
    render(this._boardComponent, this._filmListComponent, RenderPosition.BEFOREEND); // оболочка списка фильмов
    this._renderFilmList(comments);
    this._renderExtraFilms(comments);
  }
}
