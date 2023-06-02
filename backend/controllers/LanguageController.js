const Language = require("../models/LanguageModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");


const getAllLanguagesByUserId = async (req, res, next) => {

  const { userId }= req.userData;
  try {
    const language = await Language.find({ userId });
    res.status(200).json(language);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllLanguages = async (req, res, next) => {
  try {
    let {username}= req.params
    username=decodeURI(username)
    const user = await User.findOne({username})
    const languages = await Language.find({userId: user._id});
    res.status(200).json(languages);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addLanguage = async (req, res, next) => {
  const language = new Language({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    level: req.body.level,
    userId: req.body.userId,
  });

  try {
    await language.save();
    res.status(201).json(language);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteLanguage = async (req, res, next) => {
  const id = req.params.languageId;
  try {
    await Language.deleteOne({ _id: id });
    res.status(200).json({ message: "Language deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateLanguage = async (req, res, next) => {
  const id = req.params.languageId;
  Language.findByIdAndUpdate(
    id,
    {
      name: req.body.name,
      level: req.body.level,
    })
    .then((language) => {
      res.status(200).json({
        message: "Language updated successfully",
        language,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};

module.exports = {
  getAllLanguages,
  addLanguage,
  deleteLanguage,
  updateLanguage,
  getAllLanguagesByUserId
};
