const User = require("../models/user.js");
const jwt = require("jsonwebtoken");
const CryptoJS = require("crypto-js");

//REGISTER
const register = async (req, res, next) => {
    try {
        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString(),
            displayName: req.body.displayName,
            profilePicture: req.body.profilePicture,
        });
        let existUserByMail = await User.findOne({ email: req.body.email });
        if (existUserByMail) return res.status(500).json("There is a registered user with this email address.");
        let existUserByUsername = await User.findOne({ username: req.body.username });
        if (existUserByUsername) return res.status(500).json("There is a registered user with this username address.");

        await newUser.save();

        res.status(201).json({ message: "Registered Succesfully!" });
    } catch (err) {
        res.status(500).json(err);
    }
};

//LOGIN
const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return res.status(404).json("User doesn't exist!");

        const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJS.enc.Utf8);
        if (originalPassword !== req.body.password) return res.status(400).json("Password is not matching!");

        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, { expiresIn: "5d" });
        const { password, ...others } = user._doc;
        res.cookie("access_token", token, {
            httpOnly: true,
            expires: new Date(Date.now() + (3600000 * 24 * 5))
        })
        res.status(200).json(others)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
};



module.exports = { login, register }

