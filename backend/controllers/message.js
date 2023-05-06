const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');

const allMessages = async (req, res, next) => {
    const { chatId } = req.params;

    const chat = await Chat.findOne({ _id: chatId });
    if (!chat) return res.status(404).json("Chat Not Found!");


    try {
        const messages = await Message.find({ chat: chatId })
            .populate('sender', '-password')
            .populate('chat');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
};

const sendMessage = async (req, res, next) => {
    const { content, chatId, userId } = req.body;

    var newMessage = new Message({
        sender: userId,
        content: content,
        chat: chatId,
    });

    try {
        let message = await newMessage.save();

        message = await message.populate("sender", "displayName profilePicture");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "displayName profilePicture email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        res.status(400);
        console.log(error);
    }

}

module.exports = { allMessages, sendMessage }