import { SELECTORS } from "./selectors";
import { shuffle, pickRandom } from "./utils";
import { EMOJIS } from "./emoji";
import { generateTemplate } from "./generate-template";

export const generateGame = () => {
  // Получение размера доски
  const dimension = SELECTORS.board?.dataset.dimension;

  if (dimension % 2 !== 0) {
    throw new Error("Размер доски должен быть четным");
  }

  // Достаем случайне 8 эмодзи
  const picks = pickRandom(EMOJIS, (dimension * dimension) / 2);

  // Перемешиваем эмоджи 
  const shuffledEmojis = shuffle([...picks, ...picks]);

  // Генерируем шаблон карточек
  generateTemplate(shuffledEmojis);
};


