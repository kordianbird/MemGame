const sequence = [];
let humanSequence = [];
const level = 0;
const tileContainer = document.querySelector('.container');

function startGame() {
  $(".hide").hide();
  nextRound();
}

function unhide() {
    var T = $(".unhide");
    for (var i = 0; i < T.length; i++) {
        T[i].style.display = 'block';
    }
}

function nextStep() {
  const tiles = ['red', 'green', 'blue', 'yellow', 'pink', 'purple', 'grey', 'aqua', 'orange'];
  const random = tiles[Math.floor(Math.random() * tiles.length)];

  return random;
}


