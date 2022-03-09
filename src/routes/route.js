const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController")
const middleware = require("../middleware/middleware")


router.post("/createUser", userController.createUser)

router.post("/loginUser", userController.loginUser)

// //The userId is sent by front end
router.get("/users/:userId", middleware.mid1, userController.getUserData)

router.put("/users/:userId", middleware.mid1, userController.updateUser)

router.delete("/users/:userId", middleware.mid1, userController.deleteUser)

module.exports = router;