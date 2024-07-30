const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');

exports.getUserDetails = async (req, res) => {
    res.send('Welcome to the backend server!');
}

exports.registerUser = async(req, res) => {
    try {
        // Check if the email already registered
        const emailAlreadyRegistered = await userModel.findOne({email: req.body.email});
        if (emailAlreadyRegistered){
            return res.send({
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
        return res.status(201).send({
            success: true,
            message: "Registration successful."
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });

    }
}

exports.loginUser = async(req, res) => {
    try {
        // Check if the email address is registered
        const emailExists = await userModel.findOne({email: req.body.email});

        if (!emailExists){
            return res.send({
                success: false,
                message: "Email is not registered, please register."
            })
        }
        const validPassword = await bcrypt.compare(req.body.password, emailExists.password);
        if (!validPassword){
            return res.send({
                success: false,
                message: "Invalid password."
            })
        }
        return res.status(201).send({
            success: true,
            message: "Login successful."
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });

    }
}