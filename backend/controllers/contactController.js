const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

//@desc Get all Contacts 
//@route GET /api/Contacts 
//@access public 

const getContacts = asyncHandler (async (req , res )=>{
    const contacts = await Contact.find();
    res.status(200).json(contacts);
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
    const contact = await Contact.create({name , email , phone});
    res.status(201).json(contact);
}); 

//@desc Update Contact 
//@route PUT /api/Contacts 
//@access public 
const updateContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
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
//@access public 
const deleteContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    console.log("Contact Found");
    
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    await contact.deleteOne();
    console.log("deleted");
    res.status(200).json(contact);
});


//@desc Get individual Contact 
//@route GET /api/Contacts 
//@access public 
const getContact = asyncHandler (async (req , res )=>{
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(400);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});


module.exports = {getContacts , createContact , updateContact , deleteContact , getContact};