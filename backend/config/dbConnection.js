const mongoose = require('mongoose');

const connectDb = async () =>{
    try {
        const connect = await mongoose.connect(process.env.CONNECTION_STRING);
        
    } catch (error) {
        console.log("Error in Connecting Mongo DB");
        process.exit(1);
    }
}

module.exports = connectDb;