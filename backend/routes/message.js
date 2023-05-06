const verify = require("../middleware/verify.js");
const {
    allMessages,
    sendMessage
} = require("../controllers/message.js");
const router = require("express").Router();


router.get("/:chatId", verify, allMessages);
router.post("/" , verify, sendMessage);


module.exports = router;
