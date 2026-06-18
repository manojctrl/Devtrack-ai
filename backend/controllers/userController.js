const User = require("../models/User")

const getCurrentUser = async (req , res) => {
    try{
        const user = await User.findByPk(req.user.id,{
            attributes: {exclude : ["password"]}

        
        })

        if(!user){
            return res.status(404).json({
                message: "User not found"
            })
        }

        return res.status(200).json(user)
    }catch(error){
        console.error("Error Fetching current user", error)
        return res.status(500).json({
            message: "Server error"
        })
    }
}

module.exports = {getCurrentUser}