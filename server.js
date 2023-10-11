const express = require('express');//
const fs = require('fs')
const { readFromFile, writeToFile, readAndAppend } = require("./helpers/fsUtils")
const path = require('path');//
const uuid = require("./helpers/uuid")
const noteData = require("./db/notes.json")
const api = require("./routes/index.js")//

const app = express();//

const PORT = process.env.PORT || 3001;//

app.use(express.static('public'));//
app.use(express.json());//
// app.use(express.urlencoded({ extended: true }));
app.use("/api", api);//

app.get('/' ,(req, res) => {//
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {//
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

// app.get('/api/notes/:note_id', (req, res) => { /// notes router
//     const noteId = req.params.note_id;
//     readFromFile('./db/notes.json')
//     .then((data) => json.parse (data))
//     .then((json) => {
//         const result = json.filter((note) => note.note_id === noteId);
//         return result.length > 0 ? res.json(result) : res.json("No note with that ID exists");
//     });
// });

app.get('/db', (req, res) => res.json(noteData));//

app.get('*', (req, res) => {//
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

// app.delete('/api/notes/:note_id', (req, res) => {
//     const noteId = req.params.note_id;
//     readFromFile('./db/notes.json')
//     .then((data) => JSON.parse (data))
//     .then((json) => {
//         const result = json.filter((note) => note.note_id !== noteId);
//         writeToFile('./db/notes.json', result);
//         res.json(`Note ${noteid} has been deleted`)
//         })
//         return res.json('No such note found');
//     })

// app.post('/api/notes', (req, res) => { ///notes router
//     console.log(req.body);
//     const { noteTitle, noteText } = req.body;
    
//         if (noteTitle && noteText){
//             const newNote = {
//             title: noteTitle.value,
//             text: noteText.value,
//             note_id: uuid()
//             };
    
//             readAndAppend(newNote, './db/notes.json');
//             res.json(`Note added successfully`);
//         }else{
//             res.errored('Error occurred when writing Note');
//         }
//         });

app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));//