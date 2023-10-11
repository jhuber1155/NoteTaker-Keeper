const notes = require('express').Router();//
const { readFromFile, writeToFile, readAndAppend } = require("./../helpers/fsUtils")//
const uuid = require("./../helpers/uuid")//

notes.get('/', (req, res) => {//
    readFromFile('./db/notes.json')
    .then((data) => res.json(JSON.parse(data)));
})

notes.get('/:note_id', (req, res) => {//
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
    .then((data) => json.parse (data))
    .then((json) => {
        const result = json.filter((note) => note.note_id === noteId);
        return result.length > 0 ? res.json(result) : res.json("No note with that ID exists");
    });

notes.delete('/:note_id', (req, res) => {//
    const noteId = req.params.note_id;
    readFromFile('./db/notes.json')
    .then((data) => JSON.parse (data))
    .then((json) => {
        const result = json.filter((note) => note.note_id !== noteId);
        writeToFile('./db/notes.json', result);
        res.json(`Note ${noteid} has been deleted`)
        })
    })

return res.json('No such note found');
});

notes.post('/', (req, res) => {//
    console.log(req.body);
    const { title, text } = req.body;
    
        if (req.body){
            const newNote = {
             title,
             text,
             note_id: uuid()
            };
    
            readAndAppend(newNote, './db/notes.json');
            res.json(`Note added successfully`);
        }else{
            res.errored('Error occurred when writing Note');
        }
        });
    
    module.exports = notes;