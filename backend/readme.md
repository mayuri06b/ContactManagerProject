# 📘 Node.js + Express.js Contact Manager Project Notes

## 🛠️ Project Setup

* Initialize project: `npm init -y`
* Install dependencies:

  ```bash
  npm install express mongoose dotenv express-async-handler jsonwebtoken bcryptjs
  npm install --save-dev nodemon
  ```
* Setup `server.js`:

  ```js
  const express = require("express");
  const dotenv = require("dotenv").config();

  const app = express();
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
      console.log(`Server is listening on Port ${port}`);
  });
  ```

---

## 🔁 Nodemon

* Auto restarts server on file changes.
* Use in `package.json` scripts:

  ```json
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  }
  ```

---

## 🧪 API Testing Tools

* **Postman** or **Thunder Client** to test REST APIs.

---

## 🌐 Express Router Setup

* Example `routes/contactRoutes.js`:

  ```js
  const express = require('express');
  const router = express.Router();
  const {
    getContacts,
    createContact,
    updateContact,
    deleteContact,
    getContact
  } = require('../controllers/contactController');

  router.route('/')
    .get(getContacts)
    .post(createContact);

  router.route('/:id')
    .get(getContact)
    .put(updateContact)
    .delete(deleteContact);

  module.exports = router;
  ```

---

## 🧠 Controllers (Example: contactController.js)

```js
const asyncHandler = require('express-async-handler');
const Contact = require('../models/contactModel');

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

const createContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory!");
  }
  const contact = await Contact.create({ name, email, phone });
  res.status(201).json(contact);
});

const updateContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  const updatedContact = await Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.status(200).json(updatedContact);
});

const deleteContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  await contact.deleteOne();
  res.status(200).json({ message: "Contact deleted", contact });
});

const getContact = asyncHandler(async (req, res) => {
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  res.status(200).json(contact);
});

module.exports = { getContacts, createContact, updateContact, deleteContact, getContact };
```

---

## 🧩 Middleware (Error Handler)

```js
// middleware/errorHandler.js
const { constants } = require("../constants");

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode ? res.statusCode : 500;
  switch (statusCode) {
    case constants.VALIDATION_ERR:
    case constants.NOT_FOUND:
    case constants.UNAUTHORIZED:
    case constants.FORBIDDEN:
    case constants.INTERNAL_SERVER_ERR:
      res.json({
        title: err.name,
        message: err.message,
        stackTrace: err.stack
      });
      break;
    default:
      console.log("Unhandled error");
      break;
  }
};

module.exports = errorHandler;
```

```js
// constants.js
exports.constants = {
  NOT_FOUND: 404,
  VALIDATION_ERR: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERR: 500
};
```

---

## 🔗 MongoDB Connection (dbConnect.js)

```js
const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

module.exports = connectDB;
```

---

## 🧬 Mongoose Schema (Model)

```js
const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true }
}, {
  timestamps: true
});

module.exports = mongoose.model("Contact", contactSchema);
```

---

## 🔐 JWT & Auth

### User Model Example

```js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  username: String,
  email: { type: String, unique: true },
  password: String
});

userSchema.pre("save", async function(next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

module.exports = mongoose.model("User", userSchema);
```

### Login Controller

```js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({ _id: user._id, username: user.username, email: user.email, token: generateToken(user._id) });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});
```

### Protect Middleware

```js
const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    try {
      const token = authHeader.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded.userId;
      next();
    } catch (err) {
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

module.exports = protect;
```

---

## ✅ Topics Covered Recap

* Project structure and `server.js`
* nodemon usage
* Error handling with custom middleware
* MongoDB connection and Mongoose models
* CRUD API with Express Router
* Middleware usage
* JWT-based user authentication
* Secure route protection
* Testing with Postman/Thunder Client
