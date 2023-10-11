const express = require('express');
const fs = require('fs')
const path = require('path');
const uuid = require("./../helpers/uuid")
const noteData = require("./../db/db.json")


const app = express();

const PORT = 3001

app.use(express.static('public'));
app.use(express.json());

app.get('/' ,(req, res) => {
    res.sendFile(path.join(__dirname, '/index.html'))
});

app.get('/api/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/notes.html'))
});

app.get('/api/notes/:id', (req, res) => {
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



app.post('/api/notes', (req, res) => {
console.log(req.body);
const { title, text } = req.body;

    if (title && text){
        const newNote = {
         title,
         text,
         note_id: uuid()
        };

        const noteString = JSON.stringify(newNote);

        fs.readFile('./db/db.json', 'utf8', (err, data) => {
         if (err) {
            console.error(err);
         }else{
            const parsedNotes = JSON.parse(data);
            parsedNotes.push(newNote);
            }
 

        fs.writeFile('./db/db.json', JSON.stringify(parsedNotes, null, 4), 
        (writeErr) => err ? console.err(writeErr) : console.log( 'Note has been written to JSON file'));
        })
        const response = {
            status: 'success',
            body: newNote,
        };
        res.status(201).json(response);
    }else{
        res.status(500).json('Error occurred when posting a note');
    }
});




app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));