import UserStatusView from "./view/user-status.js";
import FilterView from "./view/filter.js";
import FilmsAmount from "./view/films-amount.js";
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
const cards = new Array(CARD_COUNT).fill().map(generateCard);
const filters = generateFilters(cards);
const comments = generateComment();
const siteHeaderElement = document.querySelector(`.header`);
const siteMainElement = document.querySelector(`.main`);
const siteFooterStatElement = document.querySelector(`.footer__statistics`);
const boardPresenter = new BoardPresenter(siteMainElement);

render(siteHeaderElement, new UserStatusView(), RenderPosition.BEFOREEND);
render(siteMainElement, new FilterView(filters), RenderPosition.BEFOREEND);
render(siteFooterStatElement, new FilmsAmount(cards), RenderPosition.BEFOREEND);

boardPresenter.init(cards, comments);
