const Message = require("../models/MessageModel");
const mongoose = require("mongoose");

const getAllMessages = async (req, res, next) => {
  try {
    const messages = await Message.find({});
    res.status(200).json(messages.reverse());
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addMessage = async (req, res, next) => {
  const message = new Message({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    email: req.body.email,
    subject: req.body.subject,
    message: req.body.message,
    userId: req.body.userId,
  });

  try {
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateMessage = async (req, res, next) => {
  const id = req.params.messageId;
  Message.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      email: req.body.email,
      subject: req.body.subject,
      message: req.body.message,
      isSeen: req.body.isSeen,
      userId: req.body.userId,

    })
    .then((message2) => {
      res.status(200).json({
        message: "Language updated successfully",
        message2,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};

module.exports = {
  getAllMessages,
  addMessage,
  updateMessage,
};
