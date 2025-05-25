const mongoose = require('mongoose');

const contactSchema = mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name:{
        type: String,
        required: [true , "Please add Contact Name"],
    },
    email: {
        type: String , 
        required: [true , "Please add Contact Email"],
    },
    phone: {
        type: String,
        required: [true , "Please add Contact Phone"],
    },
},
{
    timestamps: true,
});

module.exports = mongoose.model("Contact" , contactSchema);