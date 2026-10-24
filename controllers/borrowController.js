
const borrowService = require("../services/borrow.service");

const borrowBook = async (req, res, next) => {
  try {
    const borrow = await borrowService.borrowBook(
      req.user.id,
      req.body.bookId
    );

    res.status(201).json({
      message: "Book borrowed successfully",
      borrow
    });
  } catch (error) {
    next(error);
  }
};

const returnBook = async (req, res, next) => {
  try {
    const borrow = await borrowService.returnBook(
      req.params.id,
      req.user.id
    );

    res.status(200).json({
      message: "Book returned successfully",
      borrow
    });
  } catch (error) {
    next(error);
  }
};

const getMyBorrows = async (req, res, next) => {
  try {
    const borrows = await borrowService.getMyBorrows(
      req.user.id
    );

    res.status(200).json(borrows);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  borrowBook,
  returnBook,
  getMyBorrows
};

