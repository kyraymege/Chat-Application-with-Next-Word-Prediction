const Message = require('../models/message');
const User = require('../models/user');
const Chat = require('../models/chat');
const { spawn } = require('child_process');


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

const fetchUsersMessages = async (req, res, next) => {
    const { userId } = req.params;
    console.log(userId)
    try {
        const allMessages = [];
        const messages = await Message.find({ sender: userId }).sort({ createdAt: -1 }).limit(100);
        messages.forEach(element => {
            allMessages.push(element.content);
        });
        res.status(200).json(allMessages);
    } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }
}

const guessWord = async (req, res, next) => {
    const { userId } = req.params;
    const { word } = req.body;
    var dataToSend;
    // spawn new child process to call the python script
    const python = spawn('python', ['guess_word.py', userId, word]);
    // collect data from script
    python.stdout.on('data', function (data) {
        console.log(data.toString())
        dataToSend = data.toString();
    });
    // in close event we are sure that stream from child process is closed
    python.on('close', (code) => {
        console.log(`child process close all stdio with code ${code}`);
        // send data to browser
        res.status(200).send(dataToSend)
    });
}

module.exports = { allMessages, sendMessage, fetchUsersMessages, guessWord }