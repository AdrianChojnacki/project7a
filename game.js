// Game statistics
const gameStats = {
  playerHand: null,
  aiHand: null,
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

// Hands selector
const hands = [...document.querySelectorAll(`.select img`)];

// Hand selection function
const handSelection = (e) => {
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  e.target.style.boxShadow = "0 0 0 4px yellow";
  gameStats.playerHand = e.target.dataset.option;
};

// Hand selection listener
hands.forEach((hand) => hand.addEventListener(`click`, handSelection));

// AI selection function
const aiSelection = () => {
  gameStats.aiHand = hands[Math.floor(Math.random() * 3)].dataset.option;
};

// Publish result function
const publishResult = () => {
  gameStats.games++;

  document.querySelector(`[data-summary="your-choice"]`).textContent = gameStats.playerHand;
  document.querySelector(`[data-summary="ai-choice"]`).textContent = gameStats.aiHand;

  if (gameStats.playerHand === gameStats.aiHand) {
    gameStats.draws++;

    document.querySelector(`[data-summary="who-win"]`).textContent = "REMIS";
    document.querySelector(`[data-summary="who-win"]`).style.color = "gray";
  } else if (
    (gameStats.playerHand === "paper" && gameStats.aiHand === "rock") ||
    (gameStats.playerHand === "rock" && gameStats.aiHand === "scissors") ||
    (gameStats.playerHand === "scissors" && gameStats.aiHand === "paper")
  ) {
    gameStats.wins++;

    document.querySelector(`[data-summary="who-win"]`).textContent = "WYGRANA";
    document.querySelector(`[data-summary="who-win"]`).style.color = "green";
  } else {
    gameStats.losses++;

    document.querySelector(`[data-summary="who-win"]`).textContent = "Przegrana";
    document.querySelector(`[data-summary="who-win"]`).style.color = "red";
  }
};

// Update summary function
const updateSummary = () => {
  document.querySelector(`.numbers span`).textContent = gameStats.games;
  document.querySelector(`.wins span`).textContent = gameStats.wins;
  document.querySelector(`.losses span`).textContent = gameStats.losses;
  document.querySelector(`.draws span`).textContent = gameStats.draws;
};

// End game function
const endGame = () => {
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  gameStats.playerHand = null;
};

// Main function
const letsPlay = () => {
  if (!gameStats.playerHand) {
    alert("Wybierz dłoń");
  } else {
    aiSelection();
    publishResult();
    updateSummary();
    endGame();
  }
};

// Main listener
document.querySelector(`.start`).addEventListener(`click`, letsPlay);
