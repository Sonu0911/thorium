const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    bookCover: {
        type: String,
        required: true
    },
    excerpt: {
        type: String,
        required: true
    },
    userId: {
        type: ObjectId,
        required: true,
        ref: "users"
    },
    ISBN: {
        type: String,
        required: true,
        unique: true,
        match: [/\b(?:ISBN(?:: ?| ))?((?:97[89])?\d{9}[\dx])\b/]
    },
    category: {
        type: String,
        required: true
    },
    subcategory: {
        type: String,
        required: true
    },
    reviews: {
        type: Number,
        default: 0,
        comment: [String]
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    releasedAt: {
        type: Date,
        required: true,
        format: ("YYYY-MM-DD")
    },


}, { timestamps: true });

module.exports = mongoose.model('books', bookSchema)