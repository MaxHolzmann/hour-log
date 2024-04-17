const mongoose = require("mongoose");

const entrySchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  hours: {
    type: Number,
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: false,
  },
});

const Entry = mongoose.models.Entry || mongoose.model("Entry", entrySchema);

module.exports = Entry;
