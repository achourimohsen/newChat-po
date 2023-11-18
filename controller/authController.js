const userModel = require("../model/userModel")
const bcrypt =require("bcrypt")
const jwt = require("jsonwebtoken")

module.exports = {
    // register user
    register: async(req, res) => {
        try{
            const salt = bcrypt.genSaltSync(10)

            const hash = await bcrypt.hashSync(req.body.password, salt)
            
            const newUser = await new userModel({...req.body, password: hash})

            await newUser.save()

            res.status(200).json({
                success: true, 
                message: "successduly created",
                data: newUser
            })
        } catch(error) {
            res.status(500).json({
                message: "failed, Try again"
            })
        }
    },    

    login: async (req, res) => {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email })
    
        // if user doesn't exist
        if (!user) {
          return res.status(400).json({ 
            message: "Email Invalid" 
          })
        }
     // if user is exist then check the password or compare the password
        bcrypt.compare(password, user.password).then(
          (isMatch) => {
    
            // if password is incorrect
            if (isMatch === false) {
              return res.status(400).json({ message: "password is Wrong ..." })
            }
             // create jwt 
             else {            
              const token = jwt.sign(
                { data: { id: user._id, isAdmin: user.isAdmin } },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: '1d' }
              )
              return res.status(200).json({
                message: "success ...",
                token: token,
                user: user
              })
            }
          }
        )
      },

      

    // login user
    // login: async(req, res) => {
    //     const {email, password} =req.body
    //     const newUser = await userModel.findOne({email})

    //     // if does'nt exist
    //     if(!newUser) {
    //         return res.status(400).json({
    //             message: "Email invalid"
    //         })
    //     }
    //     // if user exist then check the pss or compare th pss
    //     bcrypt.compare(password, newUser.password).then(
    //         (isMatch) => {
    //             // if pss is incrrct
    //             if (isMatch === false) {
    //                 return res.status(402).json({
    //                     message: "pssword is wrong"
    //                 })
    //             }
    //             // create jwt
    //             else {
    //                 const token = jwt.sign(
    //                     {data: {
    //                         id: userModel._id,
    //                         isRead: userModel.isRead
    //                     }},
    //                     process.env.ACCESS_TOKEN_SECRET,
    //                     {expireIn: "2d"}
    //                 )
    //                 return res.status(200).json({
    //                     message: "Enter! is success",
    //                     token: token,
    //                     userModel: userM
    //                 })
    //             }
    //         }
    //     )
    // },
}