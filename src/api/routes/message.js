const router = require("express").Router();
const messageController = require("../controllers/messageController");

router.post("/", messageController.createMessage);

module.exports = router;
