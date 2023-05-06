const {
  accessChat,
  fetchChat,
  createGroup,
  kickUserFromGroup,
  addUserToGroup,
  changeGroupName,
} = require("../controllers/chat.js");
const router = require("express").Router();
const verify = require("../middleware/verify.js");


router.post("/", verify, accessChat)

router.get("/:userId", verify, fetchChat)

router.post("/groupChat", verify, createGroup)

router.put("/groupChat/changeName", verify, changeGroupName)

router.put("/groupChat/add", verify, addUserToGroup)

router.put("/groupChat/kick", verify, kickUserFromGroup)

module.exports = router;
