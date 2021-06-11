let sequence = [];
let playerSequence = [];
let level = 0;

const head = document.querySelector('.head');
const startButton = document.querySelector('.startBtn');
const info = document.querySelector('.info');
const heading = document.querySelector('.heading');
const tileContainer = document.querySelector('.tile-container');

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'grey', 'aqua', 'orange'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

function nextRound() {
  level += 1;

  tileContainer.classList.add('unclick');
  /* level info */


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 600 + 1000);
}

function PLayerTurn(tile) {
  const index = playerSequence.push(tile) - 1;
  /*const sound = document.querySelector(`[data-sound='${tile}']`);*/
  /*sound.play();*/

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    resetGame('Oops! Game over, you pressed the wrong tile');
    return;
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 20) {
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

  info.textContent = `Your turn: ${remainingTaps} Tap${
    remainingTaps > 1 ? 's' : ''
  }`;
}



function startGame() {
  head.classList.add('hidden');
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  tileContainer.classList.remove('hidden');
  nextRound();
}

startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) PLayerTurn(tile);
});


