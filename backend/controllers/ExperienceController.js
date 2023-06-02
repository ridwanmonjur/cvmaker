const Experience = require("../models/ExperienceModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");


const getAllExperiencesByUserId = async (req, res, next) => {
  const { userId }= req.userData;
  try {
    const experience = await Experience.find({userId});
    res.status(200).json(experience);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllExperiences = async (req, res, next) => {
  try {
    let {username}= req.params
    username=decodeURI(username)
    const user = await User.findOne({username})
    const experiences = await Experience.find({userId: user._id});
    res.status(200).json(experiences);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addExperience = async (req, res, next) => {
  const experience = new Experience({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    company: req.body.company,
    city: req.body.city,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    description: req.body.description,
    technologies: req.body.technologies,
    userId: req.body.userId,
  });

  try {
    await experience.save();
    res.status(201).json(experience);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteExperience = async (req, res, next) => {
  const id = req.params.experienceId;
  try {
    await Experience.deleteOne({ _id: id });
    res.status(200).json({ message: "Experience deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateExperience = async (req, res, next) => {
  const id = req.params.experienceId;
  Experience.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      company: req.body.company,
      city: req.body.city,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      description: req.body.description,
      technologies: req.body.technologies,
    })
    .then((experience) => {
      res.status(200).json({
        message: "Experience updated successfully",
        experience
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    }) 
};

module.exports = {
  getAllExperiences,
  addExperience,
  deleteExperience,
  updateExperience,
  getAllExperiencesByUserId
};
