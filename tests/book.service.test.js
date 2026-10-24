

const bookRepository = require("../repositories/book.repository");

const bookService = require("../services/book.service");

describe("Book Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("getAllBooks", () => {
    test("should return all books", async () => {
      const books = [
        {
          id: "book-1",
          title: "JavaScript Basics",
          author: "Ahmed",
          totalCopies: 3,
          availableCopies: 3
        }
      ];

      bookRepository.getAllBooks.mockResolvedValue(books);

      const result = await bookService.getAllBooks();

      expect(result).toEqual(books);

      expect(bookRepository.getAllBooks).toHaveBeenCalled();
    });
  });

  describe("createBook", () => {
    test("should create a book with available copies", async () => {
      const bookData = {
        title: "JavaScript Basics",
        author: "Ahmed",
        totalCopies: 3
      };

      bookRepository.createBook.mockImplementation(
        async (data) => ({
          id: "book-1",
          ...data
        })
      );

      const result = await bookService.createBook(bookData);

      expect(result.title).toBe("JavaScript Basics");

      expect(result.availableCopies).toBe(3);

      expect(bookRepository.createBook).toHaveBeenCalledWith({
        title: "JavaScript Basics",
        author: "Ahmed",
        totalCopies: 3,
        availableCopies: 3
      });
    });
  });

  describe("getBookById", () => {
    test("should throw an error when book is not found", async () => {
      bookRepository.getBookById.mockResolvedValue(null);

      await expect(
        bookService.getBookById("unknown-id")
      ).rejects.toThrow("Book not found");
    });
  });

  describe("searchBooks", () => {
    test("should search for books by keyword", async () => {
      const books = [
        {
          id: "book-1",
          title: "JavaScript Basics",
          author: "Ahmed"
        }
      ];

      bookRepository.searchBooks.mockResolvedValue(books);

      const result = await bookService.searchBooks("JavaScript");

      expect(result).toEqual(books);

      expect(bookRepository.searchBooks).toHaveBeenCalledWith(
        "JavaScript"
      );
    });
  });
});
