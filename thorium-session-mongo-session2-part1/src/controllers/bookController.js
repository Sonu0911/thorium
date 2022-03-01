const bookModel = require("../models/bookModel");

const createBook = async function(req, res) {
    let bookData = req.body;
    let saveBooksData = await bookModel.create(bookData);
    res.send({ msg: saveBooksData });
};

const bookList = async function(req, res) {
    let allBooksDatal = await bookModel
        .find()
        .select({ bookName: 1, authorName: 1 });
    res.send({ msg: allBooksDatal });
};

const getBooksInYear = async function(req, res) {

    let result = req.query.result;
    let allBooksData2 = await bookModel.find({ year: { $eq: result } });
    res.send({ msg: allBooksData2 });

};

const getParticularBooks = async function(req, res) {
    let allBooksData3 = await bookModel.find();
    res.send({ msg: allBooksData3 });

};

const getXINRBooks = async function(req, ras) {
    let (indianPrice, europePrice) = bookModel.price
    let allBooksDates = await bookModel.find({
        $or: [{ indianPrice: { $eq: "100INR" } }, { indianPrice: { $eq: "200INR" } }, { indianPrice: { Seq: "500INR" } }, ],
    });
    res.send({ msg: allBooksData4 });

};
const getRandomBooks = async function(req, res) {
    let allBooksData = await UserModel.find();
    res.send({ msg: allBooksData })
};

module.exports.createBook = createBook;
module.exports.booklist = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks;

module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks