const { login, register } = require("../controllers/auth.js");
const router = require("express").Router();

//CREATE A USER
router.post("/register", register)

//SIGN IN
router.post("/login", login)

module.exports = router;
