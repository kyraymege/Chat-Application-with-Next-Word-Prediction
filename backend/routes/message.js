const verify = require("../middleware/verify.js");
const {
    allMessages,
    sendMessage,
    fetchUsersMessages,
    readMessage,
    // guessWord
} = require("../controllers/message.js");
const router = require("express").Router();


router.get("/:chatId", verify, allMessages);
router.post("/" , verify, sendMessage);
router.get("/user/:userId", fetchUsersMessages)
// router.get("/guessWord/:userId", guessWord)
router.put("/read/:messageId", verify, readMessage);


module.exports = router;
