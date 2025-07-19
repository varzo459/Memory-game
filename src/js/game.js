import { SELECTORS } from "./selectors"; 
import { STATE } from "./state"; 
import { shuffle, pickRandom } from "./utils"; 
import { EMOJIS } from "./emoji"; 
import { generateTemplate } from "./generate-template"; 


/**
 * Переворачивает карточку лицевой стороной вверх
 * @param {HTMLElement} card - DOM-элемент карточки
 */
const flipCard = (card) => {
  if (!STATE.isGameStarted) return;
  card.classList.add('flipped');
};


/**
 * Обновляет состояние игры после переворота карточки
 * @param {HTMLElement} card - Перевернутая карточка
 */
const updateGameState = (card) => {
  STATE.flippedCards++;
  
  if (STATE.flippedCards === 1) {
    STATE.firstCard = card; 
  } 
  else if (STATE.flippedCards === 2) {
    STATE.secondCard = card; 
    checkForMatch(); 
  }
};


/**
 * Проверяет, совпадают ли перевернутые карточки
 */
const checkForMatch = () => {
  STATE.isBlocked = true;
  
  const firstEmoji = STATE.firstCard.querySelector('.card-front').textContent;
  const secondEmoji = STATE.secondCard.querySelector('.card-front').textContent;
  
  // если карточки совпадают
  if (firstEmoji === secondEmoji) {
    STATE.foundPairs++; 
    STATE.flippedCards = 0; 
    STATE.isBlocked = false; 
    isGameWon(); 
  } 
  // если карточки не совпадают
  else {
    setTimeout(() => {
      STATE.firstCard.classList.remove('flipped');
      STATE.secondCard.classList.remove('flipped');
      STATE.flippedCards = 0; 
      STATE.isBlocked = false; 
    }, 1000);
  }
  
  // обновляем счетчик ходов
  STATE.moves++;
  SELECTORS.moves.textContent = `${STATE.moves} ходов`;
};


/**
 * Проверяет, выполнено ли условие победы
 */
const isGameWon = () => {
  const dimension = SELECTORS.board?.dataset.dimension;
  const totalPairs = (dimension * dimension) / 2;
  
  if (STATE.foundPairs === totalPairs) {
    SELECTORS.win.style.display = 'flex';
    SELECTORS.win.innerHTML = `
      <div class="win-text">
        Игра успешна пройдена!<br/>
        Вы выиграли за <span class="highlight">${STATE.moves}</span> ходов!
      </div>
    `;
  }
};

/**
 * Сбрасывает состояние игры к начальным значениям
 */
const resetGameState = () => {
  STATE.isGameStarted = false; // игра не активна
  STATE.moves = 0; // обнуляем счетчик ходов
  STATE.timer = 0; // сбрасываем таймер
  STATE.flippedCards = 0; // нет перевернутых карточек
  STATE.foundPairs = 0; // найденных пар нет
  STATE.isBlocked = false; // игровое поле не заблокировано
  STATE.firstCard = null; // сбрасываем первую карточку
  STATE.secondCard = null; // сбрасываем вторую карточку
  
  SELECTORS.moves.textContent = "0 ходов";
  SELECTORS.win.style.display = 'none'; 
};

/**
 * Устанавливает обработчики кликов для всех карточек
 */
const setupCardClickHandlers = () => {
  const cards = document.querySelectorAll('.card');
  
  // для каждой карточки добавляем обработчик клика
  cards.forEach(card => {
    card.addEventListener('click', () => {
      if (!STATE.isGameStarted) return;

      if (!card.classList.contains('flipped') && 
          !STATE.isBlocked && 
          STATE.flippedCards < 2) {
        flipCard(card); 
        updateGameState(card); 
      }
    });
  });
};

/**
 * Начинает игру
 */
export const startGame = () => {
  STATE.isGameStarted = true; 
  SELECTORS.button.textContent = "Сбросить";
  SELECTORS.button.classList.remove('disabled');
};

/**
 * Генерирует новую игру (игровое поле и карточки)
 */
export const generateGame = () => {
  resetGameState(); // сбрасываем состояние игры
  
  const dimension = SELECTORS.board?.dataset.dimension;

  // проверяем, что размер поля четный
  if (dimension % 2 !== 0) {
    throw new Error("Размер доски должен быть четным");
  }

  // выбираем случайные эмодзи для карточек
  const picks = pickRandom(EMOJIS, (dimension * dimension) / 2);
  // создаем пары и перемешиваем
  const shuffledEmojis = shuffle([...picks, ...picks]);
  
  // очищаем игровое поле
  SELECTORS.board.innerHTML = '';
  // генерируем и добавляем карточки
  generateTemplate(shuffledEmojis);
  // устанавливаем обработчики кликов
  setupCardClickHandlers();
  
  // настраиваем кнопку "Начать"
  SELECTORS.button.classList.add('disabled');
  SELECTORS.button.textContent = "Начать";
};