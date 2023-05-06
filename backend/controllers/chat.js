const User = require("../models/user.js");
const Chat = require("../models/chat.js");

const accessChat = async (req, res, next) => {
    const { contactId, currentUserId } = req.body;

    const user = await User.findOne({ _id: contactId });
    if (!user) return res.status(404).json("User doesn't exist!");

    var chat = await Chat.find({
        isGroup: false,
        $and: [
            { members: { $elemMatch: { $eq: currentUserId } } },
            { members: { $elemMatch: { $eq: contactId } } },
        ],
    })
        .populate("members", "-password")
        .populate("latestMessage");

    chat = await User.populate(chat, {
        path: "latestMessage.sender",
        select: "displayName profilePicture username email",
    });

    if (chat.length > 0) {
        res.send(chat[0]);
    } else {
        var chatData = {
            chatName: "sender",
            isGroup: false,
            members: [currentUserId, contactId],
        };

        try {
            const createdChat = await Chat.create(chatData);
            const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
                "members",
                "-password",
            );
            res.status(200).json(FullChat);
        } catch (err) {
            res.status(500).json(err);
            console.log(err);
        }
    };
};

const fetchChat = async (req, res, next) => {
    try {
        const chats = await Chat.find({ members: { $elemMatch: { $eq: req.params.userId } } })
            .populate("members", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage");

        const populatedChats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "displayName profilePicture username email",
        });

        res.status(200).json(populatedChats);

    } catch (err) {
        res.status(500).json(err);
        console.log(err);
    }
};


const createGroup = async (req, res, next) => {
    const { users, chatName, user } = req.body;
    if (users.length < 2) return res.status(400).json("You need to add at least 2 users to create a group chat!");

    try {
        users.push(user);
        await Chat.create({
            chatName: chatName,
            isGroup: true,
            members: users,
            groupAdmin: user,
        }).then((groupChat) => {
            groupChat
                .populate("members", "-password")
                .populate("groupAdmin", "-password")
            res.status(200).json(groupChat);
        })
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const changeGroupName = async (req, res, next) => {
    const { chatId, chatName } = req.body;
    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.status(404).json("Group is not active!");

    try {
        const updateGroupName = await Chat.findByIdAndUpdate(
            chatId,
            { chatName: chatName },
            { new: true })
            .populate("members", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(updateGroupName);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const addUserToGroup = async (req, res, next) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.status(404).json("Group is not active!");

    try {
        const addUserToGroup = await Chat.findByIdAndUpdate(
            chatId,
            { $push: { members: userId } },
            { new: true }
        )
            .populate("members", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(addUserToGroup);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const kickUserFromGroup = async (req, res, next) => {
    const { chatId, userId } = req.body;

    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.status(404).json("Group is not active!");

    try {
        const removeUserFromGroup = await Chat.findByIdAndUpdate(
            chatId,
            { $pull: { members: userId } },
            { new: true }
        )
            .populate("members", "-password")
            .populate("groupAdmin", "-password")

        res.status(200).json(removeUserFromGroup);

    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};










module.exports = { accessChat, fetchChat, createGroup, changeGroupName, addUserToGroup, kickUserFromGroup }

