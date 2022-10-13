const express = require("express");
const Note = require("../models/noteModel");
const routes = express.Router();
//Get all notes
routes.get("/notes", async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).send(notes);
  } catch (err) {
    res.status(401).send(err);
  }
});

//Create a note by using req.body
routes.post("/notes", async (req, res) => {
  try {
    const note = await Note.create(req.body);
    res.status(200).send(note);
    console.log(note);
  } catch (err) {
    res.status(401).send(err);
  }
});

//Get a note by id
routes.get("/note/:id", async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.status(200).send(note);
  } catch (err) {
    res.status(401).send(err);
  }
});

//Update a note by using req.body
routes.put("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).send(note);
  } catch (err) {
    res.status(401).send(err);
  }
});

//Delete a note by id
routes.delete("/note/:id", async (req, res) => {
  try {
    const note = await Note.findByIdAndDelete(req.params.id);
    res.status(200).send(note);
  } catch (err) {
    res.status(401).send(err);
  }
});

module.exports = routes;
