// const notes = require('express').Router();
// const { readFromFile, writeToFile, readAndAppend } = require("./../helpers/fsUtils")

// notes.get('/api/notes', (req, res) => {
//     res.sendFile(path.join(__dirname, '/notes.html'))
// });

// notes.get('/api/notes/:id', (req, res) => {
//     console.log(req.params)
//     const requestedNote = req.params.id;
//     for (let i = 0; i < noteData.length; i++){
//         if(requestedNote === noteData[i].id){
//         return res.json(noteData[i]);
//     }
// }
// return res.json('No such note found');
// });

// notes.post('/api/notes', (req, res) => {
//     console.log(req.body);
//     const { title, text } = req.body;
    
//         if (title && text){
//             const newNote = {
//              title,
//              text,
//              note_id: uuid()
//             };
    
//             readAndAppend(newNote, './db/db.json');
//             res.json(`Note added successfully`);
//         }else{
//             res.errored('Error occurred when writing Note');
//         }
//         });
    
//     module.exports = notes;