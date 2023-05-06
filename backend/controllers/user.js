const User = require("../models/user.js");

const fetchallUsers = async (req, res, next) => {
    try {
        const searchedWord = req.query.search
            ? {
                $or: [
                    { displayName: { $regex: req.query.search, $options: "i" } },
                    { username: { $regex: req.query.search, $options: "i" } },
                ],
            }
            : {};

        const users = await User.find(searchedWord).find({ _id: { $ne: req.user._id } });
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
        console.log(err);
    }
};



module.exports = { fetchallUsers }

