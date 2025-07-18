export const STATE = {
  /* Статус игры */
  isGameStarted: false,
  /* Кол-во ходов */
  moves: 0,
  /* Общее время в игре */
  timer: 0,
  /* Кол-во перевернутых карточек */
  flippedCards: 0,
  /* Кол-во совпавших карточек */
  foundPairs: 0,
  /* Блокировка поля во время проверки карточек */
  isBlocked: false,
  /* Первая перевернутая карточка */
  firstCard: null,
  /* Вторая перевернутая карточка */
  secondCard: null
};

