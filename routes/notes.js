const notes = require('express').Router();//allows for routing
const { readFromFile, writeToFile, readAndAppend } = require("./../helpers/fsUtils")//pulls in helper utilities for rewrite and append
const uuid = require("./../helpers/uuid")//pulls in helpers for random id generator

notes.get('/', (req, res) => {// allows us to read the notes stored in db/notes
    readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data)));
})

notes.get('/:note_id', (req, res) => {//checks to see if the note id in the /db/notes json has a unique id and is searchable by its unique id in the url
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
    .then((data) => json.parse (data))
    .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0 ? res.json(result) : res.json("No note with that ID exists");
    });
});

notes.delete('/:id', (req, res) => {//allows you to delete a specific note based on its unique id parameter
    const noteId = req.params.id;
    console.log(noteId)
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse (data))
    .then((json) => {
        const result = json.filter((note) => note.id !== noteId);
        console.log(result)
        writeToFile('./db/notes.json', result);
        res.json(`Note ${noteId} has been deleted`)
        });
    });


notes.post('/', (req, res) => {//allows you to create a new note on the note page with the follow variables, text, title, and unique id then reads and appends the list of notes to allow it to add the new note to the list of existing notes
    console.log(req.body);
    const { title, text } = req.body;
    
        if (req.body){
            const newNote = {
             title,
             text,
             id: uuid()
            };
    
            readAndAppend(newNote, './db/notes.json');
            res.json(`Note added successfully`);
        }else{
            res.errored('Error occurred when writing Note');
        }
        });
    
    module.exports = notes; //exports notes so we can reference it and link it on other pages.