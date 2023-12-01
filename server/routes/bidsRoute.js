const router = require('express').Router();
const Bid = require('../models/bidModel');
const authMiddleWare = require('../middleware/authMiddleware');

//place new Bid 
router.post('/place-new-bid', authMiddleWare, async (req, res) => {
    try {
        const newBid = new Bid(req.body);
        await newBid.save();
        res.send({
            success: true,
            message: "Bid Placed successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get all bids 
router.post("/get-all-bids", authMiddleWare, async (req, res) => {
    try {
        const { product, seller } = req.body;
        let filters = {}
        if (product) {
            filters.product = product
        }
        if (seller) {
            filters.seller = seller;
        }
        const bids = await Bid.find(filters).populate("product seller").populate("buyer").populate("seller");
        res.send({ success: true, data: bids })
    } catch (error) {
        res.send({
            success: true,
            message: error.message
        })
    }
})
module.exports = router;