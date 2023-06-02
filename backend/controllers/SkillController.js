const Skill = require("../models/SkillsModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");
const SkillsModel = require("../models/SkillsModel");

const getAllSkillsByUserId = async (req, res, next) => {
  const { userId }= req.userData;
  try {
    const skill = await Skill.find({ userId });
    res.status(200).json(skill);
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const getAllSkills = async (req, res, next) => {
  try {
    let {username}= req.params
    username=decodeURI(username)
    const user = await User.findOne({username});
    const skills = await SkillsModel.find({userId: user._id});
    res.status(200).json(skills);
  } catch (error) {
    res.status(500).json({ error: error});
  }
};

const addSkill = async (req, res, next) => {
  const skill = new Skill({
    _id: new mongoose.Types.ObjectId(),
    type: req.body.type,
    level: req.body.level,
    userId: req.body.userId,
  });

  try {
    await skill.save();
    res.status(201).json(skill);
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const deleteSkill = async (req, res, next) => {
  const id = req.params.skillId;
  try {
    await Skill.deleteOne({ _id: id });
    res.status(200).json({ message: "Skill deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err});
  }
};

const updateSkill = async (req, res, next) => {
  const id = req.params.skillId;
  Skill.findByIdAndUpdate(
    id,
    {
      type: req.body.type,
      level: req.body.level,
    })
    .then((skill) => {
      res.status(200).json({
        message: "Skill updated successfully",
        skill,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};

module.exports = {
  getAllSkills,
  addSkill,
  deleteSkill,
  updateSkill,
  getAllSkillsByUserId
};
