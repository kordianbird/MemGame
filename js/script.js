
function startGame() {
    var hide = document.getElementsByClassName("hide");

    if (hide) {
        for ( var x = 0; x < hide.length; x++) {
            hide[x].style.visibility = "hidden";
        }
    }
}

document.getElementById("game").addEventListener('click', startGame);