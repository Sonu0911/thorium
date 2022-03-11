const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const middleWare = require("../middleware/auth.js")



router.post("/users", userController.createUser)

router.post("/login", userController.loginUser)

//The userId is sent by front end
router.get("/users/:userId", middleWare.authenticate, middleWare.authorise, userController.getUserData)
router.post("/users/:userId/posts", middleWare.authenticate, middleWare.authorise, userController.postMessage)
router.put("/users/:userId", middleWare.authenticate, middleWare.authorise, userController.updateUser)
    // router.delete('/users/:userId', userController.deleteUser)

module.exports = router;