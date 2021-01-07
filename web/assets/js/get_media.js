function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}

const title = document.getElementById("PageTitle");

function loadtracksbyauthor(songauthor) {
    document.getElementById("media_list").innerHTML = "";
    title.innerHTML = `Author: ${songauthor}`;
    if (songauthor=="Radio") {title.innerHTML = `Live Radio`};

    var url = '/api/media';
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            const res = http.response.split(",,");
            res.forEach(element => {
                var li = document.createElement("li");
                var text = document.createElement("a")
                const albumcover = UrlExists(`media/${element.split(".")[0]}.png`) ? `media/${element.split(".")[0]}.png` : "web/assets/images/Album.jpg";
                text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split(".")[0]}`;
        
                if (text.innerHTML.includes(`@${songauthor}`)) {
                    text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split("@")[0]}<span class="authorentry"> ${element.split("@")[1].split(".")[0]}</span>`;
                    text.href = `?p=${element}`
                    li.appendChild(text);
                    text.className = "titleentry";
                    document.getElementById("media_list").appendChild(li);
                }
            });
        }
    };
    http.send();
}

function loadalltracks() {
    document.getElementById("media_list").innerHTML = "";
    title.innerHTML = "Media Library";

    var url = '/api/media';
    var http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            const res = http.response.split(",,");
            res.forEach(element => {
                
                if (!element.includes(".txt")) { //Excluded File Types
                    var li = document.createElement("li");
        
                    var text = document.createElement("a")
                    const albumcover = UrlExists(`media/${element.split(".")[0]}.png`) ? `media/${element.split(".")[0]}.png` : "web/assets/images/Album.jpg";
                    text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split(".")[0]}`;
                    text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split("@")[0]}<span class="authorentry"> ${element.split("@")[1].split(".")[0]}</span>`;
                    text.href = `?p=${element}`
                    li.appendChild(text);
                    text.className = "titleentry";
                    document.getElementById("media_list").appendChild(li);
                }


            });
        }
    };
    http.send();
}

loadalltracks();