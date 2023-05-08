const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth.js");
const userRoutes = require("./routes/user.js");
const chatRoutes = require("./routes/chat.js");
const messageRoutes = require("./routes/message.js");
const path = require("path");
const multer = require("multer");

dotenv.config();

const PORT = process.env.PORT || 8800;
const app = express();
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true,
}
));
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
app.use("/images", express.static(path.join(__dirname, "/images")))

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "images")
    }, filename: (req, file, cb) => {
        cb(null, req.body.name);
    },
})

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("File has been uploaded!");
})

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Mongo Atlas is connected.");
}).catch((error) => console.log(error))

const server = app.listen(PORT, () => {
    console.log("Backend server is running!")
})

const io = require("socket.io")(server, {
    pingTimeout: 60000,
    cors: {
        origin: true,
        credentials: true,
    }
})

io.on("connection", (socket) => {
    console.log("connected to socket");
    socket.on('setup', (userData) => {
        socket.join(userData._id);
        console.log("joined room", userData._id);
        socket.emit('connected');
    })

    socket.on('join chat', (room) => {
        socket.join(room);
        console.log("user joined room", room);
    })

    socket.on('new message', (newMessageRecieved) => {
        var chat = newMessageRecieved.chat;
        socket.to(chat._id).emit('message recieved', newMessageRecieved);

    })

    socket.on('typing', (room) => {
        socket.in(room).emit('typing', room);
    })

    socket.on('stop typing', (room) => {
        socket.in(room).emit('stop typing', room);
    })

    socket.off('setup', (userData) => {
        socket.leave(userData._id);
        console.log("left room", userData._id);
    })
})