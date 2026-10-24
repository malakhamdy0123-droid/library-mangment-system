require("dotenv").config();
require("reflect-metadata");

const app = require("./app");
const { AppDataSource } = require("./config/database");

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await AppDataSource.initialize();

    console.log("Database connected successfully!");

    app.listen(PORT, () => {
      console.log(Server is running on port ${PORT});
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
};

startServer();
