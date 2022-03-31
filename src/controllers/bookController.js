const bookModel = require("../models/bookModel")
const userModel = require("../models/userModel")
const mongoose = require("mongoose")
const reviewModel = require("../models/reviewModel")


const isValid = function(value) {
    if (typeof value === 'undefined' || value === null) return false
    if (typeof value === 'string' && value.trim().length === 0) return false
    return true
}

const isValidObjectId = function(objectId) {
    return mongoose.Types.ObjectId.isValid(objectId)
}

const createBook = async function(req, res) {
    try {
        let books = req.body

        const { title, userId, excerpt, ISBN, category, subcategory, releasedAt } = books
        books.releasedAt = Date.now()

        if (Object.keys(books) == 0) {
            return res.status(400).send({ status: false, msg: "No input provided" })
        }

        if (!isValidObjectId(userId)) {
            return res.status(400).send({ status: false, msg: "userId is required" })
        }

        if (!excerpt) {
            return res.status(400).send({ status: false, msg: "excerpt is required" })
        }

        if (!title) {
            return res.status(400).send({ status: false, msg: "title is required" })
        }

        if (!(/\b(?:ISBN(?:: ?| ))?((?:97[89])?\d{9}[\dx])\b/.test(ISBN))) {
            return res.status(400).send({ status: false, msg: "enter the valid ISBN" })
        }

        if (!category) {
            return res.status(400).send({ status: false, msg: "category is required" })
        }

        if (!subcategory) {
            return res.status(400).send({ status: false, msg: "subcategory is required" })
        }

        if (!releasedAt) {
            return res.status(400).send({ status: false, msg: "releasedAt is required" })
        }

        let user = await userModel.findById(userId)

        if (user) {
            let booksCreated = await bookModel.create(books)
            res.status(201).send({ status: true, msg: "book created successfully", data: booksCreated })

        } else {
            return res.status(400).send({ status: false, msg: "This is the invalid userId" })
        }

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

const getBooks = async function(req, res) {
    try {
        data = req.query
        const obj = {};
        obj.isDeleted = false
        const { userId, category, subcategory } = data;


        if (Object.keys(data) == 0) {
            return res.status(400).send({ status: false, msg: "No input provided" })
        }

        if (isValid(userId) && isValidObjectId(userId)) {
            obj.userId = userId
        }

        if (isValid(category)) {
            obj.category = category.trim()
        }

        if (isValid(subcategory)) {
            obj.subcategory = subcategory.trim()
        }

        const bookList = await bookModel.find(obj).select({ _id: 1, title: 1, excerpt: 1, category: 1, reviews: 1, releasedAt: 1 }).sort({ title: 1 })
        if (bookList.length == 0) {
            return res.status(404).send({ status: false, msg: "nothing is found" })
        }
        return res.status(200).send({ status: false, msg: "Books List", data: bookList })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}
const getBookDetailsById = async function(req, res) {
    try {
        data = req.params.bookId

        if (!isValid(data)) {
            return res.status(400).send({ status: false, msg: "path param is missing/invalid" })
        }

        if (!isValidObjectId(data)) {
            return res.status(400).send({ status: false, msg: "path param is not in valid format" })
        }

        let Book = await bookModel.findOne({ _id: data, isDeleted: false })
            // console.log(bookDetails)
        if (!Book) {
            return res.status(400).send({ status: false, msg: "no book found/alredy deleted" })
        }

        let reviewer = await reviewModel.find({ bookId: data, isDeleted: false }).sort({ rating: -1 })

        const {...data1 } = Book
        console.log(data1)
        data1._doc.reviewsData = reviewer
            // bookData.reviewsData.push(reviewer)


        // bookDetails.reviewsData = reviewer

        // console.log(bookDetails)

        return res.status(200).send({ status: false, msg: "done", data: data1._doc })

    } catch (err) {
        return res.status(500).send({ status: false, msg: err.message })
    }
}





const updateBooks = async function(req, res) {
    try {
        bookId = req.params.bookId

        if (Object.keys(bookId).length == 0) {
            return res.status(400).send({ status: false, msg: "please provide input" })
        }

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ status: false, msg: "please provide a valid bookId" })
        }

        const bookAvailable = await bookModel.findOne({ _id: bookId, isDeleted: false })
        if (!bookAvailable) {
            return res.status(400).send({ status: false, msg: "no book found" })
        }


        let obj = {}
        data = req.body
        const { title, excerpt, releasedAt, ISBN } = data

        if (title) {
            if (!isValid(title)) {
                return res.status.send({ status: false, msg: "enter valid Id" })
            }
            const dupliTitle = await bookModel.find({ title: title })
            if (dupliTitle.length > 0) {
                return res.status(400).send({ status: false, msg: "title should be unique" })
            }
            obj.title = title
        }


        if (excerpt) {
            if (!isValid(excerpt)) {
                return res.status(400).send({ status: false, msg: "enter valid excerpt " })
            }
            obj.excerpt = excerpt
        }

        if (releasedAt) {
            if (!isValid(releasedAt)) {
                return res.status(400).send({ status: false, msg: "enter valid releasedAt" })
            }
            obj.releasedAt = releasedAt
        }


        if (ISBN) {
            if (!isValid(ISBN)) {
                return res.status(400).send({ status: false, msg: "enter valid ISBN" })
            }
            let dupliISBN = await bookModel.find({ ISBN: ISBN })
            if (dupliISBN.length > 0) {
                return res.status(400).send({ status: false, msg: "ISBN already exist" })
            }
            obj.ISBN = ISBN

        }

        const updatedBook = await bookModel.findByIdAndUpdate(bookId,
            obj, { new: true })

        return res.status(200).send({ status: false, msg: "Updated books", data1: updatedBook })


    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}


const deleteBooks = async function(req, res) {
    try {
        let bookId = req.params.bookId;
        // let bookD = req.body
        // bookD.deletedAt = Date.now()

        if (!isValidObjectId(bookId)) {
            return res.status(400).send({ error: "please enter valid bookId  in params" });
        }

        let book = await bookModel.findById({
            _id: bookId
        })

        if (!isValid(book)) {
            return res.status(400).send({ msg: "book is not found" });
        }

        if (book.isDeleted == true) {
            return res.status(404).send({ status: false, msg: "book is already deleted" })
        }

        let deleteBook = await bookModel.findOneAndUpdate({
            _id: bookId
        }, { isDeleted: true, deletedAt: Date.now() }, { new: true })

        res.status(200).send({
            status: true,
            msg: "successfully deleted",
            data: deleteBook
        })

    } catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}

module.exports.createBook = createBook
module.exports.getBooks = getBooks
module.exports.getBookDetailsById = getBookDetailsById
module.exports.updateBooks = updateBooks
module.exports.deleteBooks = deleteBooks