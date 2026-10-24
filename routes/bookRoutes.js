
const express = require("express");

const bookController = require("../controllers/bookController");

const authMiddleware = require("../middlewares/authMiddleware");
const roleMiddleware = require("../middlewares/roleMiddleware");
const validate = require("../middlewares/validate");

const {
  bookSchema,
  updateBookSchema
} = require("../validators/book.validator");

const router = express.Router();

router.get("/", bookController.getAllBooks);

router.get("/search", bookController.searchBooks);

router.get("/:id", bookController.getBookById);

router.post(
  "/",
  authMiddleware,
  roleMiddleware("admin"),
  validate(bookSchema),
  bookController.createBook
);

router.patch(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  validate(updateBookSchema),
  bookController.updateBook
);

router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware("admin"),
  bookController.deleteBook
);

module.exports = router;
