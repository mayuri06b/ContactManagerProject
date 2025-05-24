const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : {
        type: String , 
        required:[true , "Please add username"]
    },
    email:{
        type:String , 
        unique:[true , "Email already exist"],
        required:[true , "Please add email"]
    },
    password:{
        type: String , 
        required:[true , "Mandatory"]
    }
}, {
    timeStamps: true,
});

module.exports = mongoose.model("User" , userSchema);