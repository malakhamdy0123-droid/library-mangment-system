

const bookRepository = require("../repositories/book.repository");

const borrowRepository = require("../repositories/borrow.repository");

const borrowService = require("../services/borrow.service");

describe("Borrow Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("borrowBook", () => {
    test("should borrow a book successfully", async () => {
      const book = {
        id: "book-1",
        title: "JavaScript Basics",
        totalCopies: 3,
        availableCopies: 3
      };

      bookRepository.getBookById.mockResolvedValue(book);

      bookRepository.updateBook.mockResolvedValue({
        ...book,
        availableCopies: 2
      });

      borrowRepository.createBorrow.mockResolvedValue({
        id: "borrow-1",
        status: "active",
        book: { id: "book-1" },
        user: { id: "user-1" }
      });

      const result = await borrowService.borrowBook(
        "user-1",
        "book-1"
      );

      expect(result.status).toBe("active");

      expect(bookRepository.updateBook).toHaveBeenCalledWith(
        "book-1",
        { availableCopies: 2 }
      );

      expect(borrowRepository.createBorrow).toHaveBeenCalled();
    });

    test("should reject borrowing when no copies are available", async () => {
      bookRepository.getBookById.mockResolvedValue({
        id: "book-1",
        availableCopies: 0,
        totalCopies: 3
      });

      await expect(
        borrowService.borrowBook("user-1", "book-1")
      ).rejects.toThrow("No copies available");

      expect(borrowRepository.createBorrow).not.toHaveBeenCalled();
    });
  });

  describe("returnBook", () => {
    test("should reject when active borrow does not exist", async () => {
      borrowRepository.findActiveBorrow.mockResolvedValue(null);

      await expect(
        borrowService.returnBook("borrow-1", "user-1")
      ).rejects.toThrow("Active borrow record not found");
    });
  });

  describe("getMyBorrows", () => {
    test("should return the user's borrow records", async () => {
      const borrows = [
        {
          id: "borrow-1",
          status: "active"
        }
      ];

      borrowRepository.getUserBorrows.mockResolvedValue(borrows);

      const result = await borrowService.getMyBorrows("user-1");

      expect(result).toEqual(borrows);

      expect(borrowRepository.getUserBorrows).toHaveBeenCalledWith(
        "user-1"
      );
    });
  });
});

