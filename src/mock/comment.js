import {
  getRndElement
} from "../utils/common.js";

const smiles = [
  `angry`,
  `puke`,
  `sleeping`,
  `smile`
];

const authors = [
  `Tim Tin`,
  `Be Me`,
  `My Me`,
  `You You`
];

const comments = [
  `Booooring`,
  `One love`,
  `Dislike!`,
  `The beeeeeeeest!!!`
];

const datas = [
  `2 days ago`,
  `today`,
  `2020/12/12 20:22`
];


export const generateComment = () => {
  const smile = getRndElement(smiles);
  const author = getRndElement(authors);
  const message = getRndElement(comments);
  const data = getRndElement(datas);

  return {
    smile,
    author,
    message,
    data
  };
};
