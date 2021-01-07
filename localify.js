//---   Variables   ---//
enable_presence = true;
supported_audio = ["mp3","wav","ogg"];
supported_art = ["png"];
//Only touch these if you know what you're doing:
web_directory = "./web";
localify_version = "v1.2.4";
//---   End Variables   ---//



//---   Imports   ---
const express = require('express');
const client = require('discord-rich-presence')('791488433604001813');
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



            } else if (ext[1] == "txt"){
                if (media) {
                    media += `,,${file}`
                } else {
                    media = file
                }


            } else {  
                console.warn(`Unsupported File Type: '.${ext[1]}' in file '/media/${file}'`)
            }
        });
        //---   Send To Client   ---//
        res.send(media);
    });
});


//Default Presence
if (enable_presence) {
    client.updatePresence({
        details: 'Browsing media library',
        state: 'Browsing',
        largeImageKey: 'album',
        largeImageText: localify_version,
        smallImageKey: 'default',
        smallImageText: 'Browsing',
        instance: true
    });
};

//Song Presence
app.post('/api/status/', (req, res) => {
    if (enable_presence) {

        const status = req.headers.media.split(",,")[0];
        const note =  req.headers.media.split(",,")[1];
        const songname = req.headers.media.split(",,")[2];
        const songauthor = req.headers.media.split(",,")[3].split(".")[0];
        const seperator = songauthor ? "•" : ""

        client.updatePresence({
            details: `${songname} ${seperator} ${songauthor}`,
            state: status,
            largeImageKey: 'album',
            largeImageText: localify_version,
            smallImageKey: note,
            smallImageText: status,
            instance: true
        })

        res.send(true);
    } else {
        res.send(false);
    }
});