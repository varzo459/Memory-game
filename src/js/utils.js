/**
 * Перемешивает элементы массива
 * @param {Array} array - Массив для перемешивания
 * @returns {Array} - Перемешанный массив
 */
export const shuffle = (array) => {
  // создаем клон исходного массива, чтобы не менять его порядок
  const clonedArray = [...array];

  // цикл
  for (let index = clonedArray.length - 1; index > 0; index--) {
    const randomIndex = Math.floor(Math.random() * (index + 1));

    // сохраняем значение текущего элемента в переменной оригинал
    const original = clonedArray[index];

    // заменяем текущий элемент на случайно выбранный элемент
    clonedArray[index] = clonedArray[randomIndex];

    // заменяем случайно выбранный элемент на оригинальный элемент
    clonedArray[randomIndex] = original;
  }

  return clonedArray;
};

/**
 * Выбирает случайные элементы из массива
 * @param {Array} array - Исходный массив
 * @param {number} items - Количество элементов для выбора
 * @returns {Array} - Массив случайно выбранных элементов
 */
export const pickRandom = (array, items) => {
  // создаем клон исходного массива, чтобы не изменять его
  const clonedArray = [...array];

  // массив для хранения случайно выбранных элементов
  const randomPicks = [];

  // цикл
  for (let index = 0; index < items; index++) {
    const randomIndex = Math.floor(Math.random() * clonedArray.length);

    randomPicks.push(clonedArray[randomIndex]);

    clonedArray.splice(randomIndex, 1);
  }

  return randomPicks;
};
