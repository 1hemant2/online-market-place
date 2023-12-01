const router = require('express').Router();
const User = require('../models/userModels');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const authMiddleware = require('../middleware/authMiddleware');
//new user Registration
router.post("/register", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        //checking if user already exist 
        if (user) {
            throw new Error('user already exist ');
        }
        //hash password 
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;
        //save user 
        const newUser = new User(req.body);
        await newUser.save();
        res.send(
            {
                success: true,
                message: "User created successfully"
            }
        )
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//user login 
router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) {
            throw new Error('users not exist ');
        }
        if (user.status !== "active") {
            throw new Error("The use account is blocked please contact to admin");
        }
        const validPassword = bcrypt.compareSync(req.body.password, user.password);
        if (!validPassword) {
            throw new Eroor('Invalid password');
        }
        //we are generating token, because if we recive token in frontend we show further home page 
        const token = jwt.sign({ userid: user._id }, process.env.TOKEN_SECRET, { expiresIn: "5d" });
        res.send({
            success: true,
            message: "user loged in successfully",
            data: token
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})
router.get("/get-current-user", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.body.userId);
        // console.log(user);
        res.send({
            success: true,
            message: "user fetch successfully",
            data: user,
        })
    } catch (error) {
        //console.log(error);
        res.send({
            success: false,
            message: error.message
        })
    }
})
//get all product admin 
router.get("/get-all-users", authMiddleware, async (req, res) => {
    try {
        const users = await User.find();
        res.send({ success: true, message: "user fetched successfully", data: users });
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})

//udpate user status 
router.put("/update-user-status/:id", authMiddleware, async (req, res) => {
    try {
        const status = req.body.status;
        await User.findByIdAndUpdate(req.params.id, { status });
        res.send({ success: true, message: "User status updated successfully" });
    } catch (error) {
        res.send({ success: false, message: error.message });
    }
})
module.exports = router