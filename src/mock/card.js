import {
  getRandomIntInclusive,
  getRndElement,
  getRandomInteger
} from "../utils/common.js";

const titles = [
  `The dance of life`,
  `The man with the golden arm`,
  `Sagebrush-trail`
];

const orgTitles = [
  `Eros mauris`,
  `Sed sed`,
  `Sed nibh vitae`
];

const posters = [
  `sagebrush-trail`,
  `the-man-with-the-golden-arm`,
  `the-dance-of-life`
];

const genres = [
  `Musical`,
  `Western`,
  `Drama`,
  `Mystery`
];

const getMassive = (arr) => {
  const array = [];
  for (let i = arr.length - 1; i > 0; i--) {
    array.push(arr[Math.floor(Math.random() * arr.length)]);
  }

  array.length = getRandomIntInclusive(1, arr.length - 1);
  return array;
};

const countries = [
  `USA`,
  `Russia`,
  `France`,
  `China`
];

const peoplesExample = [
  `Erich von Stroheim`,
  `Mary Beth Hughes`,
  `Dan Duryea`
];

const ages = [
  `18+`, `12+`, `0+`
];

const generateDescription = () => {
  const descriptions = [
    `Lorem ipsum dolor sit amet, consectetur adipiscing elit.`,
    `Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra.`,
    `Aliquam id orci ut lectus varius viverra.`,
    `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`,
    `Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.`,
    `Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.`,
    `Sed sed nisi sed augue convallis suscipit in sed felis.`,
    `Aliquam erat volutpat.`,
    `Nunc fermentum tortor ac porta dapibus.`,
    `In rutrum ac purus sit amet tempus.`
  ];

  const CARD_AMOUNT = 5;

  const array = [];
  for (let i = CARD_AMOUNT; i > 0; i--) {
    array.push(descriptions[Math.floor(Math.random() * descriptions.length)]);
  }

  array.length = getRandomIntInclusive(1, 5);
  return array;
};

const generateDate = () => {

  const maxDaysGap = 500;
  const daysGap = getRandomInteger(-maxDaysGap, maxDaysGap);
  const currentDate = new Date();

  currentDate.setHours(23, 59, 59, 999);

  currentDate.setDate(currentDate.getDate() + daysGap);

  return new Date(currentDate);
};

const generateRaiting = () => {
  const a = getRandomIntInclusive(1, 9);
  const b = getRandomIntInclusive(1, 9);
  return a + `.` + b;
};

const generateDuration = () => {
  const mins = getRandomIntInclusive(1, 50);
  const hours = getRandomIntInclusive(1, 3);

  return hours + `h ` + mins + `m`;
};

export const generateCard = () => {
  const title = getRndElement(titles);
  const poster = getRndElement(posters);
  const description = generateDescription();
  const rating = generateRaiting();
  const duration = generateDuration();
  const genre = getRndElement(genres);
  const commentAmount = getRandomIntInclusive(0, 5);
  const originalTitle = getRndElement(orgTitles);
  const people = getRndElement(peoplesExample);
  const country = getRndElement(countries);
  const age = getRndElement(ages);
  const peoples = getMassive(peoplesExample);
  const bigGenre = getMassive(genres);
  const dueDate = generateDate();

  return {
    title,
    poster,
    description,
    rating,
    duration,
    genre,
    commentAmount,
    originalTitle,
    people,
    country,
    age,
    peoples,
    bigGenre,
    dueDate,
    isFavorite: Boolean(getRandomInteger(0, 1)),
    isWatchlist: Boolean(getRandomInteger(0, 1)),
    isWishlist: Boolean(getRandomInteger(0, 1))
  };
};
