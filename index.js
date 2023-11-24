// decralation part *******
const express = require("express");
const cors = require("cors");
const { success, error } = require("consola");
const mongoose = require("mongoose");
const http = require("http");
const socketIo = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3300;

const dotenv = require("dotenv");
dotenv.config();

// configuration part *******
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./route/authRoute"));

app.use("/user", require("./route/userRoute"));

app.use("/message", require("./route/messageRoute"));

// connect to DB *******
const connectDB = require("./config/database");
connectDB();

// Socket.io *******
io.on("connection", (socket) => {
    console.log("User connected", socket.id);
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
    socket.on("disconnect", () => {
        console.log("User disconnected");
    });
});

// test part *******
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
