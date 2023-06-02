const mongoose = require("mongoose");

const languageSchema = mongoose.Schema({
  name: { type: String, required: true },
  level: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

module.exports = mongoose.model("Language", languageSchema);