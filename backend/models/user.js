const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        trim: true,
        required: true,
        max: 32
    },
    email: {
        type: String,
        trim: true,
        required: true,
        lowercase: true,
        unique: true
    },
    password: {
        type: String,
        min: 6,
    },
    profilePicture: {
        type: String,
        default: "defaultUserImage.png",
    },
    displayName: {
        type: String,
        trim: true,
        max: 32
    },
    isActive: {
        type: Boolean,
        default: true,
    }
},
    { timestamps: true }
)

module.exports = mongoose.model("User", userSchema);