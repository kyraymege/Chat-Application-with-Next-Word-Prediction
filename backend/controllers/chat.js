const User = require("../models/user.js");
const Chat = require("../models/chat.js");
const Message = require("../models/message.js");

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
    const { userId } = req.params;

    const customSort = (a, b) => {
        const aDate = a.latestMessage?.updatedAt;
        const bDate = b.latestMessage?.updatedAt;
        if (aDate > bDate) return -1;
        if (aDate < bDate) return 1;
        return 0;
    };

    try {
        const chats = await Chat.find({ members: { $elemMatch: { $eq: userId } } })
            .populate("members", "-password")
            .populate("groupAdmin", "-password")
            .populate("latestMessage")
            .sort({ "createdAt": -1 });

        const populatedChats = await User.populate(chats, {
            path: "latestMessage.sender",
            select: "displayName profilePicture username email",
        });

        await Promise.all(populatedChats.map(async (chat) => {
            try {
                const messages = await Message.find({ chat: chat._id, readBy: { $nin: userId } }).sort({ createdAt: -1 }).limit(100);
                chat.chatName = messages.length;
            } catch (error) {
                console.log(error);
            }
        }));

        // await populatedChats.forEach((chat) => {
        //     var counter = 0;
        //     Message.find({ chat: chat._id, readBy: { $nin: userId } }).sort({ createdAt: -1 }).limit(100).then((messages) => {
        //         counter = messages.length;
        //         console.log(messages.length)

        //     });
        //     chat.chatName = counter;
        //     // chat.chatName = counter;

        //     // Message.find({ chat: chat._id })
        //     //     .sort({ createdAt: -1 })
        //     //     .limit(100).then((messages) => {
        //     //         var counter = 0;
        //     //         messages.forEach(async (message) => {

        //     //             if (!message.readBy.includes(userId)) {
        //     //                 counter++;

        //     //             }

        //     //         });
        //     //         // console.log(counter)
        //     //         // chat.chatName = counter;
        //     //     });


        // });
        res.status(200).json(populatedChats.sort(customSort));


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

