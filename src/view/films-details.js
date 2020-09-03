import {
  getRandomIntInclusive
} from "../utils/common.js";

import AbstractView from "./abstract.js";


const createFilmPopupTemplate = (card, comment) => {
  const {
    title,
    poster,
    description,
    rating,
    duration,
    commentAmount,
    originalTitle,
    people,
    peoples,
    country,
    age,
    dueDate,
    bigGenre
  } = card;


  const {
    smile,
    author,
    message,
    data
  } = comment;

  const createLi = (amount) => {
    const fragment = [];
    for (let j = 0; j < amount; j++) {
      const newLi = `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${smile}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${data}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
      fragment.push(newLi);
    }
    return fragment;
  };

  const liComments = createLi(commentAmount);

  const createGenre = (array) => {
    const fragment = [];

    array.forEach((element) => {
      let newSpan = `<span class="film-details__genre">${element}</span>`;
      fragment.push(newSpan);
    });
    return fragment;
  };

  const createPeoples = (array) => {
    const fragment = [];

    array.forEach((element) => {
      let newEl = element;
      fragment.push(newEl);
    });

    fragment.length = getRandomIntInclusive(1, array.length);
    return fragment;
  };


  const spanGenres = createGenre(bigGenre);
  const writers = createPeoples(peoples);
  const actors = createPeoples(peoples);

  const date = dueDate !== null ?
    dueDate.toLocaleString(`en-US`, {
      day: `numeric`,
      month: `long`,
      year: `numeric`
    }) :
    ``;

  const genre = spanGenres.length > 1 ?
    `Genres` :
    `Genre`;

  const writerEnd = writers.length > 1 ?
    `Writers` :
    `Writer`;

  const actorEnd = actors.length > 1 ?
    `Actors` :
    `Actor`;

  return `<section class="film-details">
  <form class="film-details__inner" action="" method="get">
    <div class="form-details__top-container">
      <div class="film-details__close">
        <button class="film-details__close-btn" type="button">close</button>
      </div>
      <div class="film-details__info-wrap">
        <div class="film-details__poster">
          <img class="film-details__poster-img" src="./images/posters/${poster}.jpg" alt="">

          <p class="film-details__age">${age}</p>
        </div>

        <div class="film-details__info">
          <div class="film-details__info-head">
            <div class="film-details__title-wrap">
              <h3 class="film-details__title">${title}</h3>
              <p class="film-details__title-original">Original: ${originalTitle}</p>
            </div>

            <div class="film-details__rating">
              <p class="film-details__total-rating">${rating}</p>
            </div>
          </div>

          <table class="film-details__table">
            <tr class="film-details__row">
              <td class="film-details__term">Director</td>
              <td class="film-details__cell">${people}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${writerEnd}</td>
              <td class="film-details__cell">${writers}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${actorEnd}</td>
              <td class="film-details__cell">${actors}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Release Date</td>
              <td class="film-details__cell">${date}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Runtime</td>
              <td class="film-details__cell">${duration}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">Country</td>
              <td class="film-details__cell">${country}</td>
            </tr>
            <tr class="film-details__row">
              <td class="film-details__term">${genre}</td>
              <td class="film-details__cell">
              ${spanGenres}
            </tr>
          </table>

          <p class="film-details__film-description">
          ${description}
          </p>
        </div>
      </div>

      <section class="film-details__controls">
        <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist">
        <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched">
        <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

        <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite">
        <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
      </section>
    </div>

    <div class="form-details__bottom-container">
      <section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentAmount}</span></h3>

        <ul class="film-details__comments-list">
        ${liComments}
        </ul>

        <div class="film-details__new-comment">
          <div for="add-emoji" class="film-details__add-emoji-label"></div>

          <label class="film-details__comment-label">
            <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
          </label>

          <div class="film-details__emoji-list">
            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
            <label class="film-details__emoji-label" for="emoji-smile">
              <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
            <label class="film-details__emoji-label" for="emoji-sleeping">
              <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
            <label class="film-details__emoji-label" for="emoji-puke">
              <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
            </label>

            <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
            <label class="film-details__emoji-label" for="emoji-angry">
              <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
            </label>
          </div>
        </div>
      </section>
    </div>
  </form>
</section>
`;
};


export default class FilmPopup extends AbstractView {
  constructor(card, comment) {
    super();
    this._com = comment;
    this._film = card;
    this._closePopupClickHandler = this._closePopupClickHandler.bind(this);
  }

  getTemplate() {
    return createFilmPopupTemplate(this._film, this._com);
  }

  _closePopupClickHandler(evt) {
    evt.preventDefault();
    this._callback.editClick();
  }

  setClosePopupClickHandler(callback) {
    this._callback.editClick = callback;
    this.getElement().querySelector(`.film-details__close`).addEventListener(`click`, this._closePopupClickHandler);
  }

}
