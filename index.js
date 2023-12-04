// Declaration part
const express = require("express");
const cors = require("cors");
const { success, error } = require("consola");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");
const { createServer } = require("http"); // Changed this line
const { join } = require("node:path");
const { Server } = require("socket.io");
const userModel = require("./model/userModel");

const app = express();
const server = createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

const port = 3300;

const dotenv = require("dotenv");
dotenv.config();

// Configuration part
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoute"));
app.use("/user", require("./routes/userRoute"));
app.use("/message", require("./routes/messageRoute"));
app.use("/api", require("./routes/invitationRoute"));

// Connect to DB
const connectDB = require("./config/database");
connectDB();

let users = 0;

io.on("connection", (socket) => {
    users++;

    io.emit("userconnect", users);

    console.log("socketId", socket.id);
    console.log("User connected", users);

    socket.on("connected", async (userId) => {
        const connectUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: { isconnect: true, socketId: socket.id },
            },
            { new: true }
        );

        io.emit("isconnected", connectUser);
        console.log(connectUser);
    });

    socket.on("deconnected", async (userId) => {
        const connectUser = await userModel.findByIdAndUpdate(
            userId,
            {
                $set: { isconnect: false },
            },
            { new: true }
        );

        io.emit("isdeconnected", connectUser);
    });

    socket.on("sendInvitation", (data) => {
        io.emit("getInvitation", data);
    });

    // When you receive a message
    socket.on("message", async (data) => {
        try {
            const newMessage = new Message({
                user: data.user,
                content: data.content,
            });
            await newMessage.save();
            io.emit("message", data);
        } catch (error) {
            console.error(error);
        }
    });
    // When the user disconnect
    socket.on("disconnect", async () => {
        users--;

        const connectUser = await userModel.findOneAndUpdate(
            { socketId: socket.id },
            {
                $set: { isconnect: false },
            },
            { new: true }
        );

        io.emit("userdeconnect", users);

        console.log("socketId", socket.id);
        console.log(connectUser);
        console.log("User disconnected", users);
    });
});

// Test part
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
    try {
        success({
            message: `Success to port ${port}`,
            badge: true,
        });
    } catch (error) {
        error({ message: error.message });
    }
});
