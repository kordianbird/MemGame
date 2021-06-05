var playBtn = document.getElementById("game");

var hide = document.getElementsByClassName("hide");

function startGame() {
    if (hide) {
        for ( var x = 0; x < hide.length; x++) {
            hide[x].style.visibility = "hidden";
        }
    }
}

playBtn.addEventListener('click', startGame);