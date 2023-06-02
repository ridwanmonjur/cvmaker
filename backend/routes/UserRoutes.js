const express = require("express");
const uploadMulter = require("../middlewares/multer");
const UserController = require("../controllers/UserController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("/signup", UserController.signup);
router.post("/login", UserController.login);
router.get("/byUser", checkAuth, UserController.getOneUsersByUserId);
router.get("/user/:username", UserController.getOneUserByUsername);
router.put("/:userId", checkAuth,
    uploadMulter.single("aboutSectionImage"),
    UserController.updateUser);

module.exports = router;
