const express = require("express");

const ExperienceController = require("../controllers/ExperienceController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("/", checkAuth, ExperienceController.addExperience);
// router.get("/:experienceId", ExperienceController.getOneExperience);
router.get("/byUser", checkAuth, ExperienceController.getAllExperiencesByUserId);
router.get("/user/:username", ExperienceController.getAllExperiences);
router.delete("/:experienceId",checkAuth, ExperienceController.deleteExperience);
router.put("/:experienceId",checkAuth, ExperienceController.updateExperience);

module.exports = router;
