const express = require('express');
const router = express.Router();
const validateToken = require("../middleware/validateToken");
const {getContacts, 
    createContact ,
    updateContact ,
    deleteContact , 
    getContact} = require("../controllers/contactController")

router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact);

module.exports = router;
