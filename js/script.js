/* before the game starts, the sequence, level and score are empty */

let sequence = [];
let playerSequence = [];
let level = 0;
let score = 0;

const head = document.querySelector('.head');
const startButton = document.querySelector('.startBtn');
const info = document.querySelector('.info');
const tileContainer = document.querySelector('.tile-container');
const levelSpan = document.querySelector('.level');
const tile = document.getElementsByClassName("tile");
const scoreSpan = document.querySelector('.score');
const bigtext = document.querySelector('.bigtext');


/* resetGame() resets all sequences, score, level and arrays and hides divs */ 
function resetGame() {
  document.querySelector('.highscore').classList.remove('hidden');
  document.querySelector('.highscore').textContent = `Highscore: ${score}`;  
  sequence = [];
  playerSequence = [];
  level = 0;
  score = 0;
  startButton.classList.remove('hidden');
  info.classList.add('hidden');
  tileContainer.classList.add('unclick');
  head.classList.remove('hidden');
  tileContainer.classList.add('hidden');
  levelSpan.classList.add('hidden');
  scoreSpan.classList.add('hidden');
  $(".tile").removeClass("hidden");
  $(".nxt").addClass("hidden");
  tileContainer.classList.remove('no-margin');
  tiles.splice(9, 7);
}

const tiles = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'grey', 'aqua', 'orange',];


/* nextStep() returns random tile*/ 
function nextStep() {
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}

/* nextRound() increments level by 1, adds content and starts a sequence */
function nextRound() {
  level += 1;

  tileContainer.classList.add('unclick');
  levelSpan.textContent = `Level: ${level}`;
  scoreSpan.textContent = `Score: ${score}`;


  const nextSequence = [...sequence];
  nextSequence.push(nextStep());
  playRound(nextSequence);

  sequence = [...nextSequence];
  setTimeout(() => {
    humanTurn(level);
  }, level * 500 + 1000);
}

/* humanTurn(level) let's player tap the tiles */
function humanTurn(level) {
  tileContainer.classList.remove('unclick');
  info.textContent = `Taps: ${level}`;
}

/* activateTile(color) lights up tiles and plays sound */
function activateTile(color) {
  const tile = document.querySelector(`[data-tile='${color}']`);
  const sound = document.querySelector(`[data-sound='${color}']`);

  tile.classList.add('lit');
  sound.play();

  setTimeout(() => {
    tile.classList.remove('lit');
  }, 400);
}
 /* playRound(nextSequence) plays the next sequence */
function playRound(nextSequence) {
  nextSequence.forEach((color, index) => {
    setTimeout(() => {
      activateTile(color);
    }, (index + 1) * 500);
  });
}
 /* playerTurn(tile) determines if player lost, advances to the next stage or got the sequence correct */
function playerTurn(tile) {
  const index = playerSequence.push(tile) - 1;
  const sound = document.querySelector(`[data-sound='${tile}']`);
  sound.play();

  const remainingTaps = sequence.length - playerSequence.length;

  if (playerSequence[index] !== sequence[index]) {
    messageLost();
    setTimeout(() => {
        resetGame();
    }, 2000);
    return; 
  }

  if (playerSequence.length === sequence.length) {
    if (playerSequence.length === 5) {
        playerSequence = [];
        score += 10;
        messageStage();
        setTimeout(() => {
                nextStage();
            }, 2000);
      return;
    }

    playerSequence = [];
    info.textContent = 'Great Job!';
    score += 10;
    setTimeout(() => {
      nextRound();
    }, 800);
    return;
  } 
    info.textContent = `Taps: ${remainingTaps}`;
}

/* startGame() hides the menu and activates nextRound() */
function startGame() {
  document.querySelector('.highscore').classList.add('hidden');
  head.classList.add('hidden');
  startButton.classList.add('hidden');
  info.classList.remove('hidden');
  tileContainer.classList.remove('hidden');
  levelSpan.classList.remove('hidden');
  scoreSpan.classList.remove('hidden');
  nextRound();
}

/* when start button is pressed function startGame() activates */
startButton.addEventListener('click', startGame);
tileContainer.addEventListener('click', event => {
  const { tile } = event.target.dataset;

  if (tile) playerTurn(tile);
});

/* boxShadow() when a tile is pressed it adds shadow and lit effect */
function boxShadow() {
    this.classList.add('shadow');
    this.classList.add('lit');

    setTimeout(() => {
        this.classList.remove('shadow');
    }, 200);
    setTimeout(() => {
        this.classList.remove('lit');
    }, 200);
}

for (var i = 0; i < tile.length; i++) {
    tile[i].addEventListener('click', boxShadow, false);
}

/* nextStage(text) adds extra tiles and pushes their data to const tiles */
function nextStage() {
    $(".nxt").removeClass("hidden");

    tileContainer.classList.add('no-margin');

    tiles.push('brown','moss','violet','gold','aluminium','rose','navy');
    
    for (var i = 0; i < tile.length; i++) {
        tile[i].classList.add('nextStage');
    }

    nextRound();
}

/* messageLost() hides elements and displays message notifying player that they have lost */
function messageLost() {
    bigtext.classList.remove('hidden');
    tileContainer.classList.add('unclick');
    levelSpan.classList.add('hidden');
    scoreSpan.classList.add('hidden');
    info.classList.add('hidden');
    $(".tile").addClass("hidden");
    bigtext.textContent = 'Oops! You Lost!';
    setTimeout(() => {
        bigtext.classList.add('hidden');
    }, 2000);
}

/* messageLost() hides elements and displays message notifying player that they have advanced to the next stage */
function messageStage() {
    bigtext.classList.remove('hidden');
    tileContainer.classList.add('unclick');
    levelSpan.classList.add('hidden');
    scoreSpan.classList.add('hidden');
    info.classList.add('hidden');
    $(".tile").addClass("hidden");
    bigtext.textContent = 'Good Job! Time For The Next Stage!';
    setTimeout(() => {
        tileContainer.classList.remove('unclick');
        levelSpan.classList.remove('hidden');
        scoreSpan.classList.remove('hidden');
        info.classList.remove('hidden');
        $(".tile").removeClass("hidden");
        bigtext.classList.add('hidden');
    }, 2000);
}