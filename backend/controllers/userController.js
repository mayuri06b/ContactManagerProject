const asyncHandler = require('express-async-handler');
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//@desc Register a User 
//@route POST /api/users/register
//@access public 

const registerUser = asyncHandler (async (req , res) => {
    const { username , email , password } = req.body;
    if(!username || !email || !password){
        res.status(400);
        throw new Error('Please fill in all fields');
    }
    const userAvailable = await User.findOne({email});
    if(userAvailable) {
        res.status(400);
        throw new Error("Email already in use");
    }
    // Create HashPassword 
    const hashedPass = await bcrypt.hash(password , 10);
    console.log("Password encrypted " , hashedPass);
    const user = await User.create({username , email , password : hashedPass});
    if(user) {
        res.status(201).json({_id: user.id , email: user.email});
    }else {
        res.status(400);
        throw new Error('Invalid User');
    }
    res.json({
        message: "Register The user"
    });
});

//@desc Register a User 
//@route GET /api/users/login 
//@access public 
//Get and check

const loginUser = asyncHandler (async (req , res) => {
    const {email , password} = req.body;
    if(!email || !password) {
        res.status(400);
        throw new Error("Mandatory feild!");
    }
    const user = await User.findOne({email});
    if(user && (await bcrypt.compare(password , user.password))) {
        const accessToken = jwt.sign({
            user:{
                id : user.id,
                username : user.username,
                email : user.email
            },
        },
        process.env.JWT_SECRET, {expiresIn:"15m"});
        res.status(202).json({accessToken});
    }else {
        res.status(401);
        throw new Error("Invalid Credentials");
    }
});

//@desc Current user
//@route GET /api/users/current
//@access private

const currentUser = asyncHandler (async (req , res) => {
    res.json(req.user);
});

module.exports = {registerUser , loginUser , currentUser};