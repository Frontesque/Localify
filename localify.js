//---   Variables   ---//
web_directory = "./web";
supported_audio = ["mp3","wav","ogg"];
supported_art = ["png"];

//---   Imports   ---
const express = require('express');
//const client = require('discord-rich-presence')('791488433604001813');
const fs = require('fs');

//---   Compile Express (from NPM)   ---
const app = express();
app.use('/', express.static("./"));

//---   Start The Server   ---
console.log("╔═════════════════════════════════╗")
console.log("║Front's Core.JS            V2.3.2║")
console.log("╠═════════════════════════════════╝")                 
app.listen(80, () => console.log("╚  Started @: ", __dirname)); 

//---   Redirect Pages Correctly   ---
app.get('/', (req, res) => {
    res.sendFile(`${web_directory}/library.html`, { root: __dirname });
});
app.get('/library', (req, res) => {
    res.sendFile(`${web_directory}/library.html`, { root: __dirname });
});

//---   APIs   ---//
app.post('/api/media', (req, res) => {
    //---   Get Media Files   ---///
    fs.readdir("./media", (err, files) => {
        //---   Make Blank String   ---//
        var media = undefined;
        files.forEach(file => {
            //---   Check If File Is Supported   ---//
            const ext = file.split(".");
            if (supported_audio.includes(ext[1])) {
                //---   Push Media To String   ---//
                if (media) {
                    media += `,,${file}`
                } else {
                    media = file
                }
            } else if (supported_art.includes(ext[1])) {
                return;
            } else {  
                console.warn(`Unsupported File Type: '.${ext[1]}' in file '/media/${file}'`)
            }
        });
        //---   Send To Client   ---//
        res.send(media);
    });
});



/*
app.post('/api/media', (req, res) => {

})

//---   Presence Shit   ---//
client.updatePresence({
  state: 'Browsing Songs',
  details: 'Browsing Songs',
  largeImageKey: 'album',
  largeImageText: 'V1.1.0',
  smallImageKey: 'favicon',
  instance: true,
});
*/
