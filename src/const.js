export const SortType = {
  DEFAULT: `default`,
  DATE_DOWN: `date-down`,
  RATING: `rating`
};


const getWeightForNullDate = (dateA, dateB) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

export const sortRating = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.rating, cardB.rating);

  if (weight !== null) {
    return weight;
  }

  return cardA.rating - cardB.rating;
};

export const sortCardDown = (cardA, cardB) => {
  const weight = getWeightForNullDate(cardA.dueDate, cardB.dueDate);

  if (weight !== null) {
    return weight;
  }

  return cardB.dueDate.getTime() - cardA.dueDate.getTime();
};
