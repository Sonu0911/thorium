const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")
const publisherModel = require("../models/publisherModel")

const createBook = async function(req, res) {
    let book = req.body
    let authorId = book.author
    let publisherId = book.publisher

    //validation a
    if (!authorId) return res.send('The request is not valid as the author details are required.')

    //validation b
    let author = await authorModel.findById(authorId)
    if (!author) return res.send('The request is not valid as no author is present with the given author id')

    //validation c
    if (!publisherId) return res.send('The request is not valid as the publisher details are required.')

    //validation d
    let publisher = await publisherModel.findById(publisherId)
    if (!publisher) return res.send('The request is not valid as no publisher is present with the given publisher id')

    let bookCreated = await bookModel.create(book)
    return res.send({ data: bookCreated })
}

const getBooks = async function(req, res) {
    let books = await bookModel.find().populate('author publisher')
    res.send({ data: books })
}
const updateBookData = async function(req, res) {
    let publisherId = await publisherModel.find({ publisherName: { $in: ["HarperCollins", "Penguin"] } }).select({ _id: 1 })

    let arr = []
    arr = publisherId.map(x => x._id)

    let data = await bookModel.updateMany({ publisher: { $in: arr } }, { $set: { isHardCover: true } }, { new: true })
    res.send(data)

}

const updatedPrice = async function(req, res) {

    await bookModel.find({ ratings: { $gte: 3.5 } }).updateMany({ $inc: { price: 10 } })

    res.send("Price successfully Updated")
}

module.exports.updateBookData = updateBookData
module.exports.updatedPrice = updatedPrice
module.exports.createBook = createBook
module.exports.getBooks = getBooks
