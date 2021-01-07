//---   Global Variables   ---//
const args = new URLSearchParams(window.location.search);
const player = document.createElement("audio");
const play = document.getElementById("Media_Play");
const cover = document.getElementById("AlbumArt");
const info = document.getElementById("TrackInfo");
const repeat = document.getElementById("Media_Repeat");
var radio = false;

var repeating = false

//Progress Bar
var timer;
var percent = 0;