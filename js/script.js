let sequence = [];
let playerSequence = [];
let level = 0;

const head = document.querySelector('.head');
const startButton = document.querySelector('.startBtn');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const tileContainer = document.querySelector('.tile-container');
const levelSpan = document.querySelector('.level');

function resetGame(text) {
  alert(text);
  sequence = [];
  playerSequence = [];
  level = 0;
  startButton.classList.remove('hidden');
  info.classList.add('hidden');
  tileContainer.classList.add('unclick');
  head.classList.remove('hidden');
  tileContainer.classList.add('hidden');
  levelSpan.classList.add('hidden');
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'grey', 'aqua', 'orange'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclick');
  levelSpan.textContent = `Level ${level} of 10`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function humanTurn(level) {
  tileContainer.classList.remove('unclick');
  info.textContent = `Taps: ${level} `;
}

function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('lit');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('lit');
  }, 300);
}

function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 600);
  });
}

function playerTurn(tile) {
  const index = playerSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 10) {
      resetGame('Congrats! You completed all the levels');
      return
    }

    playerSequence = [];
    info.textContent = 'Great Job!';
    setTimeout(() => {
      nextRound();
    }, 1000);
    return;
  }
}



function startGame() {
  head.classList.add('hidden');
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  tileContainer.classList.remove('hidden');
  levelSpan.classList.remove('hidden');
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) playerTurn(tile);
});


