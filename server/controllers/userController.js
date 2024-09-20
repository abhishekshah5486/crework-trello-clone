const userModel = require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../.env')});

exports.registerUser = async(req, res) => {
    try {
        // Check if the email already registered
        const emailAlreadyRegistered = await userModel.findOne({email: req.body.email});
        if (emailAlreadyRegistered){
            return res.send({
                success: false,
                message: "Email already exists. Please login to continue."
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
            message: "Registration successful.",
            user: newUser
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
                message: "Invalid Email/Password."
            })
        }
        // Generate a jwt token
        const userId = emailExists.userId;
        const token = jwt.sign({userId: userId}, process.env.JWT_SECRET, {expiresIn: '1d'});

        // Update the user's login status
        await userModel.findOneAndUpdate(emailExists.userId, { isLoggedIn: true });
        return res.status(201).send({
            success: true,
            message: "Login successful.",
            token: token,
            user: emailExists
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });

    }
}

// Retrieve a user by id
exports.retrieveUserById = async(req, res) => {
    try {
        const user = await userModel.findById(req.params.id);
        if (user){
            return res.status(200).send({
                success: true,
                message: "User retrieved successfully.",
                user: user
            })
        }else{
            return res.send({
                success: false,
                message: "User not found."
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Update a user by id
exports.updateUserById = async(req, res) => {
    try {
        const updatedUser = await userModel.findByIdAndUpdate
        (req.params.id, req.body, {new: true});
        if (updatedUser){
            return res.status(200).send({
                success: true,
                message: "User updated successfully.",
                user: updatedUser
            })
        }
        else{
            return res.send({
                success: false,
                message: "User not found."
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Delete a user by id
exports.deleteUserById = async(req, res) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if (deletedUser){
            return res.status(200).send({
                success: true,
                message: "User deleted successfully.",
                user: deletedUser
            })
        }
        else{
            return res.send({
                success: false,
                message: "User not found."
            })
        }
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Logout a user
exports.logoutUser = async(req, res) => {
    try {
        const userId = req.params.id;
        // Implement logout logic here
        const loggedOutUser = await userModel.findByIdAndUpdate(userId, {isLoggedIn: false}, {new: true});

        return res.status(200).send({
            success: true,
            message: "Logout successful.",
            user: loggedOutUser
        })
    }
    catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}

// Validate the bearer token and return the user
exports.getCurrentUser = async (req, res) => {
    try {
        const userId = req.body.userId;
        const user = await userModel.findOne({userId}).select('-password');

        if (user){
            return res.status(200).send({
                success: true,
                message: "You are authorized.",
                user: user
            })
        }
        else{
            return res.send({
                success: false,
                message: "not authorized."
            })
        }
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Server error.",
            error: err.message
        });
    }
}