const express = require('express');
const mongoose = require("mongoose")
const router = express.Router();
const UserModel = require("../models/userModel.js")
const UserController = require("../controllers/userController")
const bookController = require("../controllers/bookController")
const reviewController = require("../controllers/reviewController")
const middleware = require("../middleware/middleware.js")

router.post("/register", UserController.createUser)
router.post("/login", UserController.loginUser)

router.post("/books", middleware.authenticate, middleware.authoriseCreate, bookController.createBook)

router.get("/books", middleware.authenticate, bookController.getBooks)

router.get("/books/:bookId", middleware.authenticate, bookController.getBookDetailsById)

router.put("/books/:bookId", middleware.authenticate, middleware.authoriseUpdateAndDelete, bookController.updateBooks)

router.delete("/books/:bookId", middleware.authenticate, middleware.authoriseUpdateAndDelete, bookController.deleteBooks)

router.post("/books/:bookId/review", reviewController.reviewer)
router.put("/books/:bookId/review/:reviewId", reviewController.updateReview)
router.delete("/books/:bookId/review/:reviewId", reviewController.deleteReview)

module.exports = router;