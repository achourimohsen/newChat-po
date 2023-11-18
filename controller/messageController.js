const messageModel = require("../model/messageModel")

module.exports = {

  create: async (req, res) => {
    try {
      const msg = await messageModel.create(req.body)
      res.status(200).json({
        message: "is created",
        data: msg
      })

    } catch (error) {
      res.status(500).json({
        message: error.message
      })
    }
  },
    gets: async(req, res) => {
        try {
            const messages = await messageModel.find().populate("user")
            res.status(200).json({
                message: "All Message",
                data: messages
            })
          } catch(error) {
            res.status(500).json({ 
                message: error.message 
            })
          }
    }
}