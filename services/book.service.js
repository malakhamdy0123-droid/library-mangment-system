
const bookRepository = require("../repositories/book.repository");

const getAllBooks = async () => {
  return await bookRepository.getAllBooks();
};

const getBookById = async (id) => {
  const book = await bookRepository.getBookById(id);

  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }

  return book;
};

const createBook = async (bookData) => {
  return await bookRepository.createBook({
    title: bookData.title,
    author: bookData.author,
    totalCopies: bookData.totalCopies,
    availableCopies: bookData.totalCopies
  });
};

const updateBook = async (id, bookData) => {
  const book = await getBookById(id);

  if (bookData.totalCopies !== undefined) {
    const borrowedCopies =
      book.totalCopies - book.availableCopies;

    if (bookData.totalCopies < borrowedCopies) {
      const error = new Error(
        "Total copies cannot be less than borrowed copies"
      );

      error.statusCode = 400;
      throw error;
    }

    bookData.availableCopies =
      bookData.totalCopies - borrowedCopies;
  }

  return await bookRepository.updateBook(id, bookData);
};

const deleteBook = async (id) => {
  const book = await getBookById(id);

  if (book.availableCopies !== book.totalCopies) {
    const error = new Error(
      "Cannot delete a book that has active borrows"
    );

    error.statusCode = 400;
    throw error;
  }

  await bookRepository.deleteBook(id);

  return {
    message: "Book deleted successfully"
  };
};

const searchBooks = async (keyword) => {
  if (!keyword || !keyword.trim()) {
    const error = new Error("Search keyword is required");
    error.statusCode = 400;
    throw error;
  }

  return await bookRepository.searchBooks(keyword.trim());
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
};
