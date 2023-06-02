const Message = require("../models/MessageModel");
const User = require("../models/UserModel");
const mongoose = require("mongoose");

const getAllMessages = async (req, res, next) => {
  try {
    const { userId }= req.userData;
    const messages = await Message.find({userId});
    res.status(200).json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addMessage = async (req, res, next) => {
  const user = await User.findOne({username: req.body.username})

  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    userId: user._id,
  });

  try {
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllMessages,
  addMessage,
};
