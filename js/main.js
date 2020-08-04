/*----- constants -----*/
const lookup = {
  null: "ഖ", //<-----could be image URLs
  "1": "X",
  "-1": "O",
};

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

/*----- app's state (variables) -----*/
let board, turn, winner;

/*----- cached element references -----*/
const squaresEl = document.querySelectorAll(".box");
const message = document.querySelector("h1");
const replayEl = document.querySelector("#replay");

/*----- event listeners -----*/
document.querySelector("#replay").addEventListener("click", init);
document.querySelector(".board").addEventListener("click", handleMove);

/*----- functions -----*/
function init() {
  board = [null, null, null, null, null, null, null, null, null];
  turn = 1;
  winner = null;
  render();
  replayEl.style.visibility = "hidden";
}

function handleMove(event) {
  const index = parseInt(event.target.id.replace("box", ""));
  if (board[index]) {
    return;
  }
  board[index] = turn;
  turn *= -1;
  winner = winning();
  render();
}

function render() {
  board.forEach(function (square, idx) {
    squaresEl[idx].textContent = lookup[square];
  });
  if (winner === "T") {
    message.innerHTML = "NONE ARE WORTHY";
    replayEl.style.visibility = "visible";
  } else if (winner) {
    message.innerHTML = `${lookup[
      winner
    ].toUpperCase()} IS BOUND FOR GREATNESS!`;
    replayEl.style.visibility = "visible";
  } else {
    message.innerHTML = `${lookup[turn].toUpperCase()} G O`;
  }
}

function winning() {
  for (let i = 0; i < winningCombos.length; i++) {
    if (
      Math.abs(
        board[winningCombos[i][0]] +
          board[winningCombos[i][1]] +
          board[winningCombos[i][2]]
      ) === 3
    )
      return board[winningCombos[i][0]];
  }
  if (board.includes(null)) return null;
  return "T";
}

// replayEl.style.visibility = "visible";

init();
