const User = require('../models/User')
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, email, githubUsername, password, } = req.body;

        
        const existingUser = await User.finndOne({
            where : {email}, 
        });

        if(existingUser) {
            return res.status(400).json({
                message: "Email already registerd"
            })
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const user = await User.create({
            firstName,
            lastName,
            email,
            githubUsername,
            hashedPassword,
        });



        res.status(201).json({
            message: "User Registerd Successfully",
            user,
        })
    }catch(error){
        req.status(500).json({
            message:error.message,
        })
    }
}


module.exports = {registerUser}