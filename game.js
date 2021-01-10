// Function objects
const gameSummary = {
  games: 0,
  wins: 0,
  losses: 0,
  draws: 0,
};

const game = {
  playerHand: null,
  aiHand: null,
};

// Hands options selector
const hands = [...document.querySelectorAll(".select img")];

// Selection function
function handSelection() {
  game.playerHand = this.dataset.option;
  console.log(game.playerHand);
  hands.forEach((hand) => (hand.style.boxShadow = ""));
  this.style.boxShadow = "0 0 0 4px yellow";
}

// Selection listener
hands.forEach((hand) => hand.addEventListener(`click`, handSelection));

// AI choice function
function aiChoice() {
  return hands[Math.floor(Math.random() * 3)].dataset.option;
}

// Main Function
function startGame() {
  if (!game.playerHand) {
    return alert("Wybierz dłoń!");
  }

  game.aiHand = aiChoice();
}

// Main listener
document.querySelector(`.start`).addEventListener("click", startGame);
