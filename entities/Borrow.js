
const { EntitySchema } = require("typeorm");

const Borrow = new EntitySchema({
  name: "Borrow",

  tableName: "borrows",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },

    borrowedAt: {
      type: "timestamp",
      createDate: true
    },

    returnedAt: {
      type: "timestamp",
      nullable: true
    },

    status: {
      type: "varchar",
      default: "active"
    }
  },

  relations: {
    user: {
      type: "many-to-one",
      target: "User",
      inverseSide: "borrows",
      joinColumn: {
        name: "userId"
      },
      nullable: false
    },

    book: {
      type: "many-to-one",
      target: "Book",
      inverseSide: "borrows",
      joinColumn: {
        name: "bookId"
      },
      nullable: false
    }
  }
});

module.exports = Borrow;
