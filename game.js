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

// Check result function
function checkResult(player, ai) {
  if (player === ai) {
    return "draw";
  } else if (
    (player === "paper" && ai === "rock") ||
    (player === "rock" && ai === "scissors") ||
    (player === "scissors" && ai === "paper")
  ) {
    return "win";
  } else {
    return "loss";
  }
}

// Publish result function
function publishResult(player, ai, result) {
  document.querySelector(`[data-summary="your-choice"]`).textContent = player;
  document.querySelector(`[data-summary="ai-choice"]`).textContent = ai;

  document.querySelector(`p.numbers span`).textContent = ++gameSummary.games;

  if (result === "win") {
    document.querySelector(`p.wins span`).textContent = ++gameSummary.wins;
    document.querySelector(`[data-summary="who-win"]`).textContent = "WYGRAŁEŚ!";
    document.querySelector(`[data-summary="who-win"]`).style.color = "green";
  } else if (result === "loss") {
    document.querySelector(`p.losses span`).textContent = ++gameSummary.losses;
    document.querySelector(`[data-summary="who-win"]`).textContent = "PRZEGRANA...";
    document.querySelector(`[data-summary="who-win"]`).style.color = "red";
  } else {
    document.querySelector(`p.draws span`).textContent = ++gameSummary.draws;
    document.querySelector(`[data-summary="who-win"]`).textContent = "REMIS";
    document.querySelector(`[data-summary="who-win"]`).style.color = "gray";
  }
}

// Main Function
function startGame() {
  if (!game.playerHand) {
    return alert("Wybierz dłoń!");
  }

  game.aiHand = aiChoice();

  const gameResult = checkResult(game.playerHand, game.aiHand);

  publishResult(game.playerHand, game.aiHand, gameResult);
}

// Main listener
document.querySelector(`.start`).addEventListener("click", startGame);
