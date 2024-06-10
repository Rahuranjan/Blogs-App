const e = require('express');
const User = require('../model/User.js');
const bcrypt = require('bcryptjs');


const getAllUsers = async (req, res) => {
    let users;
    try {
     users = await User.find({});
     
    } catch (err) {
        return res.status(500).json({ message: err.message });
    } 
    if(!users){
        return res.status(404).json({ message: 'No users found' });
    } 
    res.status(200).json({users}); 
};

const signup = async (req, res) => {
    const {name, email, password} = req.body;

    let existingUser;
    try{
        existingUser = await User.findOne({email});
    }catch(err){
       return console.log(err);
    }
    if(existingUser){
        return res.status(422).json({message: 'User already exists'});
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    const user = new User({
        name,
        email,
        password: hashedPassword,
    }); 

    try{
        await user.save();
    }catch(err){    
       return console.log(err);
    }

    return res.status(201).json({user});
}

const login = async (req, res) => {
    const {email, password} = req.body;

    let existingUser;
    try {
        existingUser = await User.findOne({email});
    }catch(err){
        return console.log(err);
    }
    if(!existingUser){
        return res.status(401).json({message: 'Invalid credentials'});
    }

    const isPasswordValid = await bcrypt.compare(password, existingUser.password);
    if(!isPasswordValid){
        return res.status(401).json({message: 'Invalid credentials'});
    }

    return res.status(200).json({message: 'Logged in successfully', user: existingUser});
    
}

module.exports = {getAllUsers, signup, login};