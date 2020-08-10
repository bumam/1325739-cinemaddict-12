export const createFilmsAmountTemplate = (card) => {
  const filmsAmount = card.length;

  return `<section class="footer__statistics">
    <p>${filmsAmount} movies inside</p>
  </section>`;
};
