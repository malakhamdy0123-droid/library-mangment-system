const { EntitySchema } = require("typeorm");

const User = new EntitySchema({
  name: "User",

  tableName: "users",

  columns: {
    id: {
      primary: true,
      type: "uuid",
      generated: "uuid"
    },

    username: {
      type: "varchar",
      length: 100
    },

    email: {
      type: "varchar",
      unique: true
    },

    password: {
      type: "varchar"
    },

    role: {
      type: "varchar",
      default: "user"
    }
  },

  relations: {
    borrows: {
      type: "one-to-many",
      target: "Borrow",
      inverseSide: "user"
    }
  }
});

module.exports = User;
