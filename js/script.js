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

function nextRound() {

    const nextSequence = [];
    nextSequence.push(nextStep());
    playRound(nextSequence);
}

function activeTile(color) {
    const tile = document.querySelector(`[data-tile='${color}']`);

    tile.classList.add("lit");

    setTimeout(() => {
        tile.classList.remove("lit");
    }, 300);
}

function playRound(nextSequence) {
    nextSequence.forEach((color, index) => {
        setTimeout(() => {
            activeTile(color);
        }, (index + 1) * 600);
    });
}