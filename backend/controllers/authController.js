const User = require('../models/User')

const registerUser = async (req, res) => {
    try{
        const {firstName, lastName, email, githubUsername, password, } = req.body;

        const user = await User.create({
            firstName,
            lastName,
            email,
            githubUsername,
            password
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