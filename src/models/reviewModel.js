const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const reviewSchema = new mongoose.Schema({
    bookId: {
        type: ObjectId,
        required: true,
        ref: "books"
    },
    reviewedBy: {
        type: String,
        required: true,
        default: 'Guest',
        value: String
    },
    reviewedAt: {
        type: Date,
        default: Date.now()
    },
    rating: {
        type: Number,
        minLenght: [1, "minimum rating should be 1 "],
        maxLength: [5, "maximum rating should not be greater than 5"],
        required: true
    },
    review: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

module.exports = mongoose.model('reviews', reviewSchema)