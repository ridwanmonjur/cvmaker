const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  isSeen: { type: Boolean, required: true, default: false },
  date: { type: Date, required: true, default: Date.now },
  
});

module.exports = mongoose.model("Message", messageSchema);
