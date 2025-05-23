const { constants } = require("../constants");
const errorHandler = (err, req, res, next) =>{
    switch (statusCode) {
        case constants.VALIDATION_ERR:
            res.json({title : "Validation Error",
                    message : err.message , 
                    stackTrace : err.stack
                });
        case constants.FORBIDDEN:
            res.json({title : "Forbidden Error",
                    message : err.message , 
                    stackTrace : err.stack
                });
        case constants.NOT_FOUND:
            res.json({title : "Not found Error",
                    message : err.message , 
                    stackTrace : err.stack
                });
        case constants.UNAUTHORIZED:
            res.json({title : "Unauthorised ",
                    message : err.message , 
                    stackTrace : err.stack
                });
        case constants.INTERNAL_SERVER_ERR:
            res.json({title : "Internal Server Error",
                    message : err.message , 
                    stackTrace : err.stack
                });
        default:
            console.log("No Error Found :)");
            break;
    }
    
};

module.exports = errorHandler;