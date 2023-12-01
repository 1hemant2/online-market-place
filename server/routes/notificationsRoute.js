const router = require('express').Router();
const authMiddleWare = require('../middleware/authMiddleware');
const Notification = require('../models/notificationsModel');

//add a notification 
router.post("/notify", authMiddleWare, async (req, res) => {
    try {
        const newNotifcation = new Notification(req.body);
        //  console.log(newNotifcation);
        await newNotifcation.save();
        res.send({
            success: true,
            message: "Notifiction added successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all user Notification
router.get("/get-all-notification", authMiddleWare, async (req, res) => {
    try {
        const notificatons = await Notification.find({
            user: req.body.userId,
        }).sort({ createdAt: -1 })
        res.send({
            success: true,
            data: notificatons
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//delete nitification 
router.delete("/delete-all-notification/:id", authMiddleWare, async (req, res) => {
    try {
        await Notification.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Notification deleted successfully"
        });
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//read all notification by user 
router.put("/read-all-notfication", authMiddleWare, async (req, res) => {
    try {
        await Notification.updateMany(
            { user: req.body.userId, read: false },
            { $set: { read: true } }  //$set is used to change in notification model 
        );
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

module.exports = router;