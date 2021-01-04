//---   Global Variables   ---//
var firstplay = true;
const args = new URLSearchParams(window.location.search);

//---   URL Checker For Album Art   ---//
function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

//---   functions   ---//
function play() {
    const player = document.getElementById("LocalifyPlayer");
    const play = document.getElementById("Media_Play");
    const cover = document.getElementById("AlbumArt");
    var info = document.getElementById("TrackInfo");

    //Setup Track Info
    var TrackTitle = args.get('p').split(".")[0]
    var TrackAuthor = "Unknown Author"
    if (TrackTitle.includes("@")) {
        TrackTitle = args.get('p').split("@")[0]
        TrackAuthor = args.get('p').split("@")[1].split(".")[0]
    }
    const AlbumArt = UrlExists(`media/${args.get('p').split(".")[0]}.png`) ? `media/${args.get('p').split(".")[0]}.png` : "web/assets/images/Album.jpg";

    if (firstplay) {
        firstplay = false;
        player.src = `media/${args.get('p')}`
        player.load();
        info.innerHTML = `${TrackTitle}<br><br>${TrackAuthor}`
        cover.src = AlbumArt
    }

    //Basic Play Pause Controls
    if (player.paused) {
        player.play();
        play.src = "web/assets/material.io/play/state0.svg";
    } else {
        player.pause();
        play.src = "web/assets/material.io/play/state1.svg";
    }



    var timer;
    var percent = 0;
    var audio = player;
    audio.addEventListener("playing", function(_event) {
    var duration = _event.target.duration;
    advance(duration, audio);
    });
    audio.addEventListener("pause", function(_event) {
    clearTimeout(timer);
    });
    var advance = function(duration, element) {
    var progress = document.getElementById("progress");
    increment = 10/duration
    percent = Math.min(increment * element.currentTime * 10, 100);
    progress.style.width = percent+'%'
    startTimer(duration, element);
    }
    var startTimer = function(duration, element){ 
    if(percent < 100) {
        timer = setTimeout(function (){advance(duration, element)}, 100);
    }
    }

}