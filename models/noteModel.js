const mongoose = require("mongoose");

//TODO - Create Note Schema here having fields
//      - noteTitle
//      - noteDescription
//      - priority (Value can be HIGH, LOW or MEDIUM)
//      - dateAdded
//      - dateUpdated
// make schema here
const NoteSchema = new mongoose.Schema({
  noteTitle: {
    type: String,
    required: true,
  },
  noteDescription: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["HIGH", "LOW", "MEDIUM"],
    default: "MEDIUM",
    required: true,
  },
  dateAdded: Date,
  dateUpdated: Date,
});

module.exports = mongoose.model("Note", NoteSchema);
