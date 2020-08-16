export const createFilmCardTemplate = (card) => {
  const {
    title,
    poster,
    description,
    rating,
    year,
    duration,
    genre,
    commentAmount,
    isFavorite,
    isWatchlist,
    isWishlist
  } = card;

  const MAX_TEXT_LENGTH = 140;

  const getCutDescription = (str) => {
    if (str.length >= MAX_TEXT_LENGTH) {
      str = str.substring(0, MAX_TEXT_LENGTH - 1) + `...`;
    }
    return str;
  };

  const descriptionLength = description.join();

  const shortDesc = getCutDescription(descriptionLength);

  const favoriteClassName = (isFavorite) ?
    `film-card__controls-item--active` :
    ``;

  const watchlistClassName = (isWatchlist) ?
    `film-card__controls-item--active` :
    ``;

  const wishlistClassName = (isWishlist) ?
    `film-card__controls-item--active` :
    ``;

  return `<article class="film-card">
  <h3 class="film-card__title">${title}</h3>
  <p class="film-card__rating">${rating}</p>
  <p class="film-card__info">
    <span class="film-card__year">${year}</span>
    <span class="film-card__duration">${duration}</span>
    <span class="film-card__genre">${genre}</span>
  </p>
  <img src="./images/posters/${poster}.jpg" alt="" class="film-card__poster">
  <p class="film-card__description">${shortDesc}</p>
  <a class="film-card__comments">${commentAmount} comments</a>
  <form class="film-card__controls">
    <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist ${wishlistClassName} ">Add to watchlist</button>
    <button class="film-card__controls-item button film-card__controls-item--mark-as-watched ${watchlistClassName} ">Mark as watched</button>
    <button class="film-card__controls-item button film-card__controls-item--favorite ${favoriteClassName} ">Mark as favorite</button>
  </form>
</article>`;
};
