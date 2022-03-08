const express = require('express');
const router = express.Router();

const UserController = require("../controllers/userController")
const orderController = require("../controllers/orderController")
const productController = require("../controllers/productController")

let mid1 = function(req, res, next) {
    let checkUser = req.body.isFreeAppUser

    if (checkUser != "undefined") {
        next()
    } else {
        res.send("request is missing a mandatory header")
    }
}
router.post("/createUser", mid1, UserController.createUser)

// router.get("/getUsersData", orderController.getUsersData)

router.post("/createProduct", productController.createProduct)
router.post("/createOrder", mid1, orderController.createOrder)
module.exports = router;