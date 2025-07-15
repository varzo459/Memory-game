import { SELECTORS } from "./selectors";
import { STATE } from "./state";
import { shuffle, pickRandom } from "./utils";
import { EMOJIS } from "./emoji";
import { generateTemplate } from "./generate-template";

// основные функции игры
const flipCard = (card) => {
  if (!STATE.isGameStarted) return;
  card.classList.add('flipped');
};

const updateGameState = (card) => {
  STATE.flippedCards++;
  
  if (STATE.flippedCards === 1) {
    STATE.firstCard = card;
  } else if (STATE.flippedCards === 2) {
    STATE.secondCard = card;
    checkForMatch();
  }
};

const checkForMatch = () => {
  STATE.isBlocked = true;
  
  const firstEmoji = STATE.firstCard.querySelector('.card-front').textContent;
  const secondEmoji = STATE.secondCard.querySelector('.card-front').textContent;
  
  if (firstEmoji === secondEmoji) {
    STATE.foundPairs++;
    STATE.flippedCards = 0;
    STATE.isBlocked = false;
    checkWin();
  } else {
    setTimeout(() => {
      STATE.firstCard.classList.remove('flipped');
      STATE.secondCard.classList.remove('flipped');
      STATE.flippedCards = 0;
      STATE.isBlocked = false;
    }, 1000);
  }
  
  STATE.moves++;
  SELECTORS.moves.textContent = `${STATE.moves} ходов`;
};

const checkWin = () => {
  const dimension = SELECTORS.board?.dataset.dimension;
  const totalPairs = (dimension * dimension) / 2;
  
  if (STATE.foundPairs === totalPairs) {
    SELECTORS.win.style.display = 'flex';
    SELECTORS.win.innerHTML = `
      <div class="win-text">
        Поздравляем! <br/>
        Вы выиграли за <span class="highlight">${STATE.moves}</span> ходов!
      </div>
    `;
  }
};

const resetGameState = () => {
  STATE.isGameStarted = false;
  STATE.moves = 0;
  STATE.timer = 0;
  STATE.flippedCards = 0;
  STATE.foundPairs = 0;
  STATE.isBlocked = false;
  STATE.firstCard = null;
  STATE.secondCard = null;
  SELECTORS.moves.textContent = "0 ходов";
  SELECTORS.win.style.display = 'none';
};

const setupCardClickHandlers = () => {
  const cards = document.querySelectorAll('.card');
  
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

// функция для старта игры
export const startGame = () => {
  STATE.isGameStarted = true;
  SELECTORS.button.textContent = "Сбросить";
  SELECTORS.button.classList.remove('disabled');
};

// основная функция игры
export const generateGame = () => {
  resetGameState();
  const dimension = SELECTORS.board?.dataset.dimension;

  if (dimension % 2 !== 0) {
    throw new Error("Размер доски должен быть четным");
  }

  const picks = pickRandom(EMOJIS, (dimension * dimension) / 2);
  const shuffledEmojis = shuffle([...picks, ...picks]);
  SELECTORS.board.innerHTML = '';
  generateTemplate(shuffledEmojis);
  setupCardClickHandlers();
  
  // блок кнопки до начала игры
  SELECTORS.button.classList.add('disabled');
  SELECTORS.button.textContent = "Начать";
};