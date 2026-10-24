 require("../repositories/book.repository");
const borrowRepository = require("../repositories/borrow.repository");

const borrowBook = async (userId, bookId) => {
  const book = await bookRepository.getBookById(bookId);

  if (!book) {
    const error = new Error("Book not found");
    error.statusCode = 404;
    throw error;
  }

  if (book.availableCopies <= 0) {
    const error = new Error("No copies available");
    error.statusCode = 400;
    throw error;
  }

  book.availableCopies -= 1;

  await bookRepository.updateBook(book.id, {
    availableCopies: book.availableCopies
  });

  try {
    return await borrowRepository.createBorrow({
      user: { id: userId },
      book: { id: bookId },
      status: "active"
    });
  } catch (error) {
    await bookRepository.updateBook(book.id, {
      availableCopies: book.availableCopies + 1
    });

    throw error;
  }
};

const returnBook = async (borrowId, userId) => {
  const borrow = await borrowRepository.findActiveBorrow(
    borrowId,
    userId
  );

  if (!borrow) {
    const error = new Error(
      "Active borrow record not found"