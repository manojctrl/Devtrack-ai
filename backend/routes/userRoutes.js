const express = require("express")
const router = express.Router()

const {getCurrentUser} = require('../controllers/userController')



const authMiddleware = require("../middleware/authMiddleware")


router.get('/profile', authMiddleware , (req, res)=> {
    res.json({
        message: "Protected route Accessed", 
        user : req.user
    })
})


router.get('/me', authMiddleware, getCurrentUser)

module.exports = router
