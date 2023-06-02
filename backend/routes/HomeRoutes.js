const express = require("express");
const bcrypt = require("bcrypt");
const UserModel = require("../models/UserModel");
const EducationModel = require("../models/EducationModel");
const ExperienceModel = require("../models/ExperienceModel");
const LanguageModel = require("../models/LanguageModel");
const SkillsModel = require("../models/SkillsModel");
const ProjectModel = require("../models/ProjectModel");

const router = express.Router();

router.get("/resetData", async (req, res, next) => {
  try {
    const user = await UserModel.findOne({ username: "default" });
    if (user != undefined) {
      await EducationModel.deleteMany({ userId: user._id })
      await ExperienceModel.deleteMany({ userId: user._id })
      await LanguageModel.deleteMany({ userId: user._id })
      await SkillsModel.deleteMany({ userId: user._id })
      await ProjectModel.deleteMany({ userId: user._id })
      await UserModel.deleteOne({ username: "default" })
    }
    let newUser = new UserModel({
      name: "Make an account and add your username",
      username: "default",
      email: "default@gmail.com",
      password: await bcrypt.hash("123456", 10),
    });
    const dateFourYearsBack = new Date();
    const dateSixYearsBack = new Date();
    const dateTenYearsBack = new Date();
    dateFourYearsBack.setFullYear(dateFourYearsBack.getFullYear() - 4);
    dateSixYearsBack.setFullYear(dateSixYearsBack.getFullYear() - 4);
    dateTenYearsBack.setFullYear(dateTenYearsBack.getFullYear() - 4);

    let newEducations = [new EducationModel({
      title: "Add your education title!",
      school: " College",
      city: "City",
      endDate: new Date(),
      startDate: dateFourYearsBack,
      userId: newUser._id
    }),
    new EducationModel({
      title: "Add your education title!",
      school: " College",
      city: "City",
      endDate: dateFourYearsBack,
      startDate: dateSixYearsBack,
      userId: newUser._id
    }),
    new EducationModel({
      title: "Add your education title!",
      school: " College",
      city: "City",
      endDate: dateSixYearsBack,
      startDate: dateTenYearsBack,
      userId: newUser._id
    }),
    ];

    let newExpreriences = [
      new ExperienceModel({
        title: "Business Development Intern",
        company: "United Nations",
        city: "New York",
        startDate: dateFourYearsBack,
        endDate: new Date(),
        description: "An amazing learning experience",
        technologies: "Communication skills, verbal reasoning and negotiation",
        userId: newUser._id
      }),
      new ExperienceModel({
        title: "Human Rights Activist",
        company: "United Nations",
        city: "New York",
        startDate: dateTenYearsBack,
        endDate: dateFourYearsBack,
        description: "My passion and dream job",
        technologies: "Communication skills, verbal reasoning and negotiation",
        userId: newUser._id
      })
    ]

    let newLanguages = [
      new LanguageModel({
        name: "Spanish",
        level: 100,
        userId: newUser._id
      }),
      new LanguageModel({
        name: "English",
        level: 100,
        userId: newUser._id
      }),
    ]

    let newProjects = [
      new ProjectModel({
        title: "Study of Human Rights",
        description: "An amazing learning experience",
        technologies: "Communication skills, verbal reasoning and negotiation",
        haveLink: true,
        link: 'https://en.m.wikipedia.org/wiki/Main_Page',
        projectImage: 'uploads/surokkah.jpeg',
        userId: newUser._id
      }),
      new ProjectModel({
        title: "Wordpress Theme Development",
        description: "Future tech job",
        technologies: "Communication skills, verbal reasoning and negotiation",
        haveLink: false,
        link: 'https://www.upwork.com/',
        projectImage: 'uploads/ppp.jpeg',
        userId: newUser._id
      })
    ]

    let newSkills = [
      new SkillsModel({
        type: "Communication",
        level: 80,
        userId: newUser._id
      }),
      new SkillsModel({
        type: "Leadership",
        level: 70,
        userId: newUser._id
      }),
    ]

    for (const newEducation of newEducations) {
      await newEducation.save()
    }
    for (const newExprerience of newExpreriences) {
      await newExprerience.save()
    }
    for (const newLanguage of newLanguages) {
      await newLanguage.save()
    }
    for (const newProject of newProjects) {
      await newProject.save()
    }
    for (const newSkill of newSkills) {
      await newSkill.save()
    }

    newUser = await newUser.save();
    res.status(200).json({
      newUser, newEducations, newExpreriences, newLanguages, newProjects, newSkills
    })
  } catch (error) {
    res.status(500).json({ error })
  }
});

module.exports = router;
