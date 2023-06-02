const mongoose = require("mongoose");

const skillsSchema = mongoose.Schema({
  type: { type: String, required: true },
  level: { type: Number, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },

});

module.exports = mongoose.model("Skills", skillsSchema);
