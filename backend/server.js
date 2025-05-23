const express = require("express");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

//provides a parser 

app.use(express.json());

app.use("/api/contacts" , require("./routes/contactRoutes"));

app.use(errorHandler);

app.listen(port ,()=>{
    console.log(`Server is listening on Port ${port}`);  
});



