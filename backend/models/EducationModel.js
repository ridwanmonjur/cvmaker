const mongoose = require("mongoose");

const educationSchema = mongoose.Schema({
  title: { type: String, required: true },
  school: { type: String, required: true },
  city: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model("Education", educationSchema);
