const jwt = require("jsonwebtoken");
module.exports = (req, res, next) => {
    try {
        const token = req.header("authorization").split(" ")[1];
        const decryptedToken = jwt.verify(token, process.env.TOKEN_SECRET);
        // console.log(token);
        // console.log(decryptedToken);
        req.body.userId = decryptedToken.userid;
        next();
    } catch (error) {
        res.send({
            success: false,
            message: error.message
        })
    }
}