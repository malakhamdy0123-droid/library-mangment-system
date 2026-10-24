const { AppDataSource } = require("../config/database");
const Book = require("../entities/Book");

const getRepository = () => {
  return AppDataSource.getRepository(Book);
};

const getAllBooks = async () => {
  return await getRepository().find();
};

const getBookById = async (id) => {
  return await getRepository().findOneBy({ id });
};

const createBook = async (bookData) => {
  const book = getRepository().create(bookData);

  return await getRepository().save(book);
};

const updateBook = async (id, bookData) => {
  const book = await getBookById(id);

  if (!book) {
    return null;
  }

  Object.assign(book, bookData);

  return await getRepository().save(book);
};

const deleteBook = async (id) => {
  const book = await getBookById(id);

  if (!book) {
    return false;
  }

  await getRepository().remove(book);

  return true;
};

const searchBooks = async (keyword) => {
  return await getRepository()
    .createQueryBuilder("book")
    .where("LOWER(book.title) LIKE LOWER(:keyword)", {
      keyword: %${keyword}%
    })
    .orWhere("LOWER(book.author) LIKE LOWER(:keyword)", {
      keyword: %${keyword}%
    })
    .getMany();
};

module.exports = {
  getAllBooks,
  getBookById,
  createBook,
  updateBook,
  deleteBook,
  searchBooks
};

