//---   URL Checker For Album Art   ---//
function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


//---   On Page Load   ---//
console.log("Player.js Loaded");

//Setup Track Info
var TrackTitle = args.get('p').split(".")[0]
var TrackAuthor = "Unknown Author"
if (TrackTitle.includes("@")) {
    TrackTitle = args.get('p').split("@")[0];
    TrackAuthor = args.get('p').split("@")[1].split(".")[0];
}

const AlbumArt = UrlExists(`media/${args.get('p').split(".")[0]}.png`) ? `media/${args.get('p').split(".")[0]}.png` : "web/assets/images/Album.jpg";
if (args.get('p').split(".")[1] == "txt"){ //If Live Radio
    const http = new XMLHttpRequest();
    const url=`/media/${args.get("p")}`;
    http.open("GET", url);
    http.send();
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            console.log(http.response)
            player.src = http.response
            player.load();
            info.innerHTML = `${TrackTitle}<br><br><span><a href="/?a=Radio">Live Radio</a></span>`
            isradio();
        }
    }


} else { //If Regular Music
    player.src = `/media/${args.get('p')}`
    player.load();
    info.innerHTML = `${TrackTitle}<br><br><span><a href="/?a=${TrackAuthor}">${TrackAuthor}</a></span>`
}
cover.src = AlbumArt
player.play();
play.src = "web/assets/material.io/play/state0.svg";

//Progress Bar
var advance = function(duration, element) {
    var progress = document.getElementById("progress");
    increment = 10/duration
    percent = Math.min(increment * element.currentTime * 10, 100);
    progress.style.width = percent+'%'
    startTimer(duration, element);
}
var startTimer = function(duration, element){ 
    if(percent < 100) { 
        timer = setTimeout(function (){
            advance(duration, element)
        }, 100);
    }
}