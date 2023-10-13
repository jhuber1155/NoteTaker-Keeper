const express = require ("express");

const notesRouter = require("./notes"); //allows us to route notes to the correct html

const app = express();

app.use('/notes', notesRouter); //the app is using the router variable

module.exports = app; //allows us to link routes between pages.