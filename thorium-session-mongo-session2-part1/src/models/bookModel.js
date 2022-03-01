const mongoose = require('mongoose');
const booksSchema = new mongoose.Schema({
    bookName: {

        type: String,
        required: true

    },

    price: {

        indianPrice: String,
        europePrice: String
    },
    year: {
        type: Number,
        default: 2021
    },
    tags: [String],
    authorName: String,
    category: String,
    stockAvailable: Boolean,
    totalPages: Number
}, { timestamps: true });


module.exports = mongoose.model('books', booksSchema)