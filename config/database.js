const { DataSource } = require("typeorm");

const User = require("../entities/User");
const Book = require("../entities/Book");
const Borrow = require("../entities/Borrow");

const AppDataSource = new DataSource({
  type: "postgres",

  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),

  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,

  database: process.env.DB_DATABASE,

  entities: [User, Book, Borrow],

  synchronize: true,

  logging: false
});

module.exports = {
  AppDataSource
};
