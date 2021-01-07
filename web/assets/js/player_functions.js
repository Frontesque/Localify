//Presence Stuff//
function setplaying(status,icon,type) {
    const presencehttp = new XMLHttpRequest();
    presencehttp.open("POST", "/api/status/");
    presencehttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    if (radio) {
        presencehttp.setRequestHeader("Media", `Live Radio,,live,,${args.get("p").split("@")[0]},,`);
    } else {
        presencehttp.setRequestHeader("Media", `${status},,${icon||"default"},,${args.get("p").split("@")[0]},,${args.get("p").split("@")[1]}`);
    }


    presencehttp.send();
}
setplaying('Playing',"playing")
//End Presence Stuff//

player.addEventListener("playing", function(_event) {
    play.src = "web/assets/material.io/play/state0.svg";
    setplaying('Playing',"playing")
    var duration = _event.target.duration;
    advance(duration, player);
});
player.addEventListener("pause", function(_event) {
    play.src = "web/assets/material.io/play/state1.svg";
    setplaying('Paused',"paused")
    clearTimeout(timer);
});


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

function isradio() {
    radio = true;
    setplaying();
}