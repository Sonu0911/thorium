const UserModel = require("../models/userModel")

const newBooks = async function(req, res) {
    let data = req.body
    let saveBooksData = await UserModel.create(data)
    res.send({ msg: saveBooksData })
}

const getBooks = async function(req, res) {
    let allBooksData = await UserModel.find()
    res.send({ msg: allBooksData })
}

module.exports.newBooks = newBooks
module.exports.getBooks = getBooks