const { EntitySchema } = require("typeorm");

const Book = new EntitySchema({
  name: "Book",

  tableName: "books",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },

    title: {
      type: "varchar",
      length: 200
    },

    author: {
      type: "varchar",
      length: 150
    },

    totalCopies: {
      type: "int",
      default: 1
    },

    availableCopies: {
      type: "int",
      default: 1
    }
  },

  relations: {
    borrows: {
      type: "one-to-many",
      target: "Borrow",
      inverseSide: "book"
    }
  }
});

module.exports = Book;
