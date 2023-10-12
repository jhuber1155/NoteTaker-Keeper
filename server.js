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

app.use("/api", api);//

app.get('/' ,(req, res) => {//
    res.sendFile(path.join(__dirname, '/public/index.html'))
});

app.get('/notes', (req, res) => {//
    res.sendFile(path.join(__dirname, '/public/notes.html'))
});

app.get('/db', (req, res) => res.json(noteData));//

app.get('*', (req, res) => {//
    res.sendFile(path.join(__dirname, '/public/index.html'))
});



app.listen(PORT, () => console.log(`Server listening at http://localhost:${PORT}`));//