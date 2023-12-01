const router = require('express').Router();
const Product = require('../models/productModel');
const authMiddleware = require('../middleware/authMiddleware');
const cloudinary = require("../config/cloudinaryConfig");
const multer = require('multer');
const User = require('../models/userModels')
//save product to database
router.post('/add-product', authMiddleware, async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        await newProduct.save();
        res.send({
            success: true,
            message: "Product successfully saved",
        })
    } catch (error) {
        res.send({
            suceess: false,
            message: error.message
        })
    }
})

//get all products 
router.post("/get-produts", async (req, res) => {
    try {
        const { seller, category = [], age = [], status, search } = req.body;
        //console.log('product route get-product', req.body.seller);
        const filters = {}
        if (seller) {
            filters.seller = seller
        }
        if (status) {
            filters.status = status
        }
        // category filters
        if (category.length > 0) {
            filters.category = { $in: category }
        }

        //filter by ages 
        if (age.length > 0) {
            age.forEach(item => {
                const fromAge = item.split("-")[0];
                const toAge = item.split("-")[1];
                filters.age = { $gte: fromAge, $lte: toAge }
            });
        }

        //search product 
        if (search) {
            const regex = new RegExp(search, "i");
            filters.name = regex;
        }


        const products = await Product.find(filters).populate('seller').sort({ createdAt: -1 });
        // console.log(products);
        res.send({
            success: true,
            data: products,

        });
    } catch (error) {
        res.send({
            suceess: false,
            message: error.message,
        })
    }
})
//const get-procut by Id 
router.get("/get-product-by-id/:id", authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("seller");
        res.send({
            success: true,
            data: product
        })
    } catch (error) {
        res.send({
            success: true,
            message: error.message,
        })
    }
})

//edit product 
router.put("/edit-product/:id", authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndUpdate(req.params.id, req.body);
        res.send({
            success: true,
            message: "Product updated successfully"
        });
    } catch (error) {
        res.send({
            suceess: false,
            message: error.message
        });
    }
})

//delete functionality
router.delete("/delete-product/:id", authMiddleware, async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.send({
            success: true,
            message: "Product deleted successfully"
        })
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})

//get image from pc 
const storage = multer.diskStorage({
    filename: function (req, file, callback) {
        callback(null, Date.now() + file.originalname);
    },
})

router.post("/upload-image-to-product", authMiddleware, multer({ storage: storage }).single("file"), async (req, res) => {
    try {
        //uploading images to cloudinary 
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "market",
        });
        const productId = req.body.productId;
        // console.log(productId);
        // console.log(result.secure_url);
        await Product.findByIdAndUpdate(productId, {
            $push: { images: result.secure_url }
        })
        res.send({
            success: true,
            message: "image uploaded successfully",
            data: result.secure_url
        }
        )
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
})


//update product status 
router.put("/update-product-status/:id", authMiddleware, async (req, res) => {
    try {
        const { status } = req.body;
        // console.log('routes->productRoute', status);
        await Product.findByIdAndUpdate(req.params.id, { status });
        //console.log('route product-route', newProduct);
        res.send({ success: true, message: "Product status updated successfully" });
    } catch (error) {
        res.send({ success: false, message: error.message })
    }
})




module.exports = router;