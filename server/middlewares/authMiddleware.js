const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.body.userId = verified.userId;
        next();
    } catch (err) {
        return res.status(401).json({
            success: false,
            message: "Invalid token."
        });    
    }
}