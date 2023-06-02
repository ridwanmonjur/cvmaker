const Project = require("../models/ProjectModel");
const mongoose = require("mongoose");
const User = require("../models/UserModel");

const getAllProjectsByUserId = async (req, res, next) => {
  const { userId }= req.userData;
  try {
    const project = await Project.find({ userId });
    res.status(200).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    let {username}= req.params
    username=decodeURI(username)
    const user = await User.findOne({username})
    const projects = await Project.find({userId: user._id});
    res.status(200).json(projects);
  } catch (error) {
    res.status(500).json({ error });
  }
};

const addProject = async (req, res, next) => {
  console.log(req.file);
  if (req.file?.path==undefined){
    return res.status(422).json({ message: "Add project image" });

  }
  const project = new Project({
    _id: new mongoose.Types.ObjectId(),
    title: req.body.title,
    description: req.body.description,
    technologies: req.body.technologies,
    haveLink: req.body.haveLink,
    link: req.body.link,
    projectImage: req?.file?.path,
    userId: req.body.userId,
  });

  try {
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteProject = async (req, res, next) => {
  const id = req.params.projectId;
  try {
    await Project.deleteOne({ _id: id });
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const updateProject = async (req, res, next) => {
  const id = req.params.projectId;
   var projectSearch;
  try {
    projectSearch = await Project.findById(id);
  } catch (err) {
    res.status(500).json({ error: err });
  }
  var filePath;
  if (req.file === undefined) {
    filePath = projectSearch.projectImage;
  } else {
    filePath = req.file.path;
  }

  Project.findByIdAndUpdate(
    id,
    {
      title: req.body.title,
      description: req.body.description,
      technologies: req.body.technologies,
      haveLink: req.body.haveLink,
      link: req.body.link,
      projectImage: filePath,
    },
    { new: true })
    .then((project) => {
      res.status(200).json({
        message: "Project updated successfully",
        project,
      });
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    })
};

module.exports = {
  getAllProjects,
  addProject,
  deleteProject,
  updateProject,
  getAllProjectsByUserId
};
