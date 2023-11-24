const userModel = require("../model/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

module.exports = {
    // register user
    register: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);

            const hash = await bcrypt.hashSync(req.body.password, salt);

            const schema = Joi.object({
                username: Joi.string(),
                password: Joi.string().pattern(
                    new RegExp("^[a-zA-Z0-9]{8,1024}$")
                ),
                email: Joi.string().email({
                    minDomainSegments: 2,
                    tlds: { allow: ["com", "net"] },
                }),
            });

            const joiError = schema.validate(req.body);

            if (joiError.error) {
                const errorMessage = joiError.error.details
                    .map((detail) => detail.message)
                    .join(", ");

                return res.status(400).json({ error: errorMessage });
            }

            const newUser = await new userModel({
                ...req.body,
                password: hash,
            });

            await newUser.save();

            res.status(200).json({
                success: true,
                message: "successduly created",
                data: newUser,
            });
        } catch (error) {
            res.status(500).json({
                message: "failed, Try again",
            });
        }
    },

    login: async (req, res) => {
        const { password, email } = req.body;

        try {
            const user = await userModel.findOne({
                email,
            });

            if (!user) {
                return res
                    .status(404)
                    .json({ message: " email or password is not valid " });
            }

            const checkPassword = await bcrypt.compare(password, user.password);
            if (!checkPassword) {
                return res
                    .status(404)
                    .json({ message: " email or password is not valid " });
            }

            const token = jwt.sign(
                {
                    email: user.email,
                    password: user.password,
                },
                "priveteKey"
            );

            res.json({ token, user });
        } catch (error) {
            res.status(500).json({
                message: "failed, Try again",
            });
        }
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
};
