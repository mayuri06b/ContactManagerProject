const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validateToken = (req , res , next)=>{
    let token ;
    let authHeader = req.headers.Authorization || req.headers.authorization ;
    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.JWT_SECRET , (err , decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User is Not Authorized");
            }
            req.user = decoded.user;
            next();
        });
        if(!token) {
            res.status(401);
            throw new Error("User is Not Authorized");
        }
    }
}
module.exports = validateToken;