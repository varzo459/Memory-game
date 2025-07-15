import { SELECTORS } from "./selectors";
import { STATE } from "./state";
import { generateGame, startGame } from "./game";

document.addEventListener('DOMContentLoaded', () => {
  generateGame();
  
  SELECTORS.button.addEventListener('click', () => {
    if (!STATE.isGameStarted) {
      startGame();
    } else {
      // перезапуск игры
      generateGame(); 
    }
  });
});