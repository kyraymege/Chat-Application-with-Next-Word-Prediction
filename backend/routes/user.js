const verify  = require("../middleware/verify.js");
const { fetchallUsers } = require("../controllers/user.js");
const router = require("express").Router();

//GET ALL USERS & SEARCH USERS
router.get("/", verify, fetchallUsers)

module.exports = router;
