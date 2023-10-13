const express = require('express');
const fs = require('fs')
const { readFromFile, writeToFile, readAndAppend } = require("./helpers/fsUtils")//helper utility needed to rewrite and append json files
const path = require('path');//required to redirect to html pates
const uuid = require("./helpers/uuid")//linking required helper to generate random id for the notes
const noteData = require("./db/notes.json")
const api = require("./routes/index.js")//required to run the routes

const app = express();

const PORT = process.env.PORT || 3001;//listening to an open port or port 3001

app.use(express.static('public'));//allows the use of public stylings like assets
app.use(express.json());

app.use("/api", api);

app.get('/' ,(req, res) => {//redirects the / to the index html
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {//redirects to the notes html
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/db', (req, res) => res.json(noteData));// /db at the end of the url shows the json file

app.get('*', (req, res) => {//any other word typed into the url will redirect to the index page
    res.sendFile(path.join(__dirname, '/public/index.html'))
});


app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));//lets us know that the port is listening through the console log