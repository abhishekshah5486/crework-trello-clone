const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUserDetails = async (req, res) => {
    res.send('Welcome to the backend server!');
}

exports.registerUser = async(req, res) => {
    try {
        // Check if the email already registered
        const emailAlreadyRegistered = userModel.findOne({email: req.body.email});
        if (emailAlreadyRegistered){
            res.send({
                success: false,
                message: "Email already exists."
            })
        }

        // Salting and Password Hashing
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        req.body.password = hashedPassword;

        const newUser = new userModel(req.body);
        await newUser.save();
        res.status(201).send({
            success: true,
            message: "Registration successful."
        })
    } catch (err) {
        res.json(err);
    }
}