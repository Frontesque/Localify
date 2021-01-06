function media_play() {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
}

function media_repeat() {
    if (!repeating) {
        repeating = "single";
        repeat.src = "web/assets/material.io/loop/state2.svg";
        player.loop = true; 

    } else if (repeating == "single") {
        repeating = false;
        repeat.src = "web/assets/material.io/loop/state0.svg";
        player.loop = false; 

    } else {
        console.warn("Looping Error")
    }
}