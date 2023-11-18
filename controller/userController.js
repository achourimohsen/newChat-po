const userModel = require("../model/userModel")
const socketIo = require("socket.io")

module.exports = {
    gets: async(req, res) => {
        try {
            const users = await userModel.find()
            res.status(200).json({
                message: "All Users",
                data: users
            })
          } catch(error) {
            res.status(500).json({ 
                message: error.message 
            })
          }
    },
    // createMessage: async(req, res) => {
    //     const {user, content} = req.body
    //     try{
    //         const newMessage = new userModel({user, content})
    //         await newMessage.save()
    //         // Send the message to everyone via Socket.io
    //         const io = socketIo()
    //         io.emit("message", {user, content})
    //         res.status(200).json(newMessage)
    //     } catch(error) {
    //         res.status(500).json({
    //             message: error.message
    //         })
    //     }
    // } 
}