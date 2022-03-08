const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: String,
    category: String,
    price: Number,

}, { timestamps: true });


module.exports = mongoose.model('Products', productSchema)