
const bookService = require("../services/book.service");

const getAllBooks = async (req, res, next) => {
  try {
    const books = await bookService.getAllBooks();

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

const getBookById = async (req, res, next) => {
  try {
    const book = await bookService.getBookById(
      req.params.id
    );

    res.status(200).json(book);
  } catch (error) {
    next(error);
  }
};

const createBook = async (req, res, next) => {
  try {
    const book = await bookService.createBook(req.body);

    res.status(201).json({
      message: "Book created successfully",
      book
    });
  } catch (error) {
    next(error);
  }
};

const updateBook = async (req, res, next) => {
  try {
    const book = await bookService.updateBook(
      req.params.id,
      req.body
    );

    res.status(200).json({
      message: "Book updated successfully",
      book
    });
  } catch (error) {
    next(error);
  }
};

const deleteBook = async (req, res, next) => {
  try {
    const result = await bookService.deleteBook(
      req.params.id
    );

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

const searchBooks = async (req, res, next) => {
  try {
    const books = await bookService.searchBooks(
      req.query.keyword
    );

    res.status(200).json(books);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
};