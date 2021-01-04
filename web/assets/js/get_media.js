function UrlExists(url){
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status!=404;
}


var url = '/api/media';
var http = new XMLHttpRequest();
http.open("POST", url, true);
http.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
        const res = http.response.split(",,");


        //---   Res = Media List In Array   ---//
        res.forEach(element => {
            var li = document.createElement("li");

            var text = document.createElement("a")
            const albumcover = UrlExists(`media/${element.split(".")[0]}.png`) ? `media/${element.split(".")[0]}.png` : "web/assets/images/Album.jpg";
            text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split(".")[0]}`;

            if (text.innerHTML.includes("@")) {
                text.innerHTML = `<img class="listcoverart" src="${albumcover}"/> ${element.split("@")[0]}<span class="authorentry"> ${element.split("@")[1].split(".")[0]}</span>`;}
                text.href = `?p=${element}`

            li.appendChild(text);
            text.className = "titleentry";
            document.getElementById("media_list").appendChild(li);
        });



    }
};
http.send();