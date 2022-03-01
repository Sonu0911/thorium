const express = require('express');
const router = express.Router();

const UserModel = require("../models/bookModel.js")
const bookController = require("../controllers/bookController")



router.post("/createBook", bookController.createBook)


router.get("/bookList", bookController.booklist)

router.get("/getBooksInYear", bookController.getBooksInYear)

router.get("/getParticularBooks", bookController.getParticularBooks)
router.get("/getXINRBooks", bookController.getXINRBooks)

router.get("/getRandomBooks", bookController.getRandomBooks)
module.exports = router