const Education = require("../models/EducationModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const { ObjectId } = require('mongodb');


const getAllEducationsByUserId = async (req, res) => {
  const userId = req.userData.userId;
  console.log({userId})
  try {
    const education = await Education.find({userId});
    console.log({education})
    res.status(200).json(education);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllEducations = async (req, res, next) => {
  try {
    let { username } = req.params
    username = decodeURI(username)
    const user = await User.findOne({ username })
    const educations = await Education.find({ userId: user._id });
    res.status(200).json(educations);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addEducation = async (req, res, next) => {
  const education = new Education({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    school: req.body.school,
    city: req.body.city,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    userId: req.body.userId,
  });

  try {
    await education.save();
    res.status(201).json(education);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateEducation = async (req, res, next) => {
  const id = req.params.educationId;
  await Education.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      school: req.body.school,
      city: req.body.city,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
    })
    .then((education) => {
      res.status(200).json({
        message: "Education updated successfully",
        education: education,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};

const deleteEducation = async (req, res, next) => {
  const id = req.params.educationId;
  try {
    await Education.deleteOne({ _id: id });
    res.status(200).json({ message: "Education deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getAllEducations,
  addEducation,
  deleteEducation,
  updateEducation,
  getAllEducationsByUserId
};
