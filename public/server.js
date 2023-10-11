const express = require('express');
const path = require('path');
const noteData = require("./../db/db.json")


const app = express();

const PORT = 3001

app.use(express.static('public'));

app.get('/' ,(req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('/notes/:id', (req, res) => {
    console.log(req.params)
    const requestedNote = req.params.id;
    for (let i = 0; i < noteData.length; i++){
        if(requestedNote === noteData[i].id){
        return res.json(noteData[i]);
    }
}
return res.json('No such note found');
});

app.get('/db', (req, res) => res.json(noteData));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));