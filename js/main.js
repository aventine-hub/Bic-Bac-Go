/*----- constants -----*/
const lookup = {
  null: "[ ]", //<-----could be image URLs
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
}

function render() {
  board.forEach(function (square, idx) {
    squaresEl[idx].textContent = lookup[square];
  });
}

function handleMove(event) {
  const index = parseInt(event.target.id.replace("box", ""));
  if (board[index]) {
    return;
  }
  board[index] = turn;
  turn *= -1;
  render();
}

// replayEl.style.visibility = "visible";

init();
