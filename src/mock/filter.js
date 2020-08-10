const cardToFilterMap = {
  all: (cards) => cards.length,
  favorites: (cards) => cards
    .filter((card) => card.isFavorite).length,
  wishlist: (cards) => cards
    .filter((card) => card.isWishlist).length,
  watchlist: (cards) => cards
    .filter((card) => card.isWatchlist).length,
};

export const generateFilter = (cards) => {
  return Object.entries(cardToFilterMap).map(([filterName, countcards]) => {
    return {
      name: filterName,
      count: countcards(cards),
    };
  });
};
