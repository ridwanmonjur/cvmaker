const express = require("express");

const MessageController = require("../controllers/MessageController");
const checkAuth = require("../middlewares/check-auth");

const router = express.Router();

router.post("/", MessageController.addMessage);
router.get("/", checkAuth, MessageController.getAllMessages);

module.exports = router;
