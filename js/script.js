
function startGame() {
    var hide = document.getElementsByClassName("hide");

    if (hide) {
        for ( var x = 0; x < hide.length; x++) {
            hide[x].style.display = "none";
        }
    }
}

document.getElementById("game").addEventListener('click', startGame);

document.getElementById("game").addEventListener('click', function() {
    for(x = 0; x < 9; x++) {
        $('<div class="card"></div>').appendTo('.container');
    }
}, false);