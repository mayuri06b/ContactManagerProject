const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all Contacts 
//@route GET /api/Contacts 
//@access private 

const getContacts = asyncHandler (async (req , res )=>{
    const contacts = await Contact.find({user_id:req.user.id});
    res.status(200).json(contacts);
});

//@desc Create new Contact 
//@route POST /api/Contacts 
//@access private 
const createContact = asyncHandler( async (req , res )=>{
    console.log("The request body is" , req.body);
    const {name , email , phone} = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All Fields are mandatory !");
    }
    const contact = await Contact.create({name , email , phone , user_id:req.user.id});
    res.status(201).json(contact);
}); 

//@desc Update Contact 
//@route PUT /api/Contacts 
//@access private 
const updateContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update Other user contact");
    }
    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new:true}
    );

    res.status(200).json(updatedContact);
});

//@desc Get individual Contact 
//@route GET /api/Contacts 
//@access private 
const deleteContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    console.log("Contact Found");
    
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString()!== req.user.id) {
        res.status(403);
        throw new Error("User dont have permission to update Other user contact");
    }
    await contact.deleteOne({_id:req.params.id});
    console.log("deleted");
    res.status(200).json(contact);
});


//@desc Get individual Contact 
//@route GET /api/Contacts 
//@access private 
const getContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


module.exports = {getContacts , createContact , updateContact , deleteContact , getContact};