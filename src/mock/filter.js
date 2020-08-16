const cardToFilterMap = {
  all: (cards) => cards.length,
  favorites: (cards) => cards
    .filter((card) => card.isFavorite).length,
  wishlist: (cards) => cards
    .filter((card) => card.isWishlist).length,
  watchlist: (cards) => cards
    .filter((card) => card.isWatchlist).length,
};


export const generateFilters = (cards) => {
  let result = {};
  Object.entries(cardToFilterMap).forEach(([filterName, countcards]) => {
    result[filterName] = countcards(cards);
  });
  return result;
};
