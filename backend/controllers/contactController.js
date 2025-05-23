const asyncHandler = require('express-async-handler');
//@desc Get all Contacts 
//@route GET /api/Contacts 
//@access public 

const getContacts = asyncHandler (async (req , res )=>{
    res.status(200).json({message: "Get all Contacts"});
});

//@desc Create new Contact 
//@route POST /api/Contacts 
//@access public 
const createContact = asyncHandler( async (req , res )=>{
    console.log("The request body is" , req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    res.status(201).json({message: "Create Contact"});
}); 

//@desc Update Contact 
//@route PUT /api/Contacts 
//@access public 
const updateContact = asyncHandler (async (req , res )=>{
    res.status(200).json({message: `Update Contact for ${req.params.id}`});
});

//@desc Get individual Contact 
//@route GET /api/Contacts 
//@access public 
const deleteContact = asyncHandler (async (req , res )=>{
    res.status(200).json({message: `Delete Contact for ${req.params.id}`});
});


//@desc Get individual Contact 
//@route GET /api/Contacts 
//@access public 
const getContact = asyncHandler (async (req , res )=>{
    res.status(200).json({message: `Get Contact for ${req.params.id}`});
});


module.exports = {getContacts , createContact , updateContact , deleteContact , getContact};