
const express = require("express");

const borrowController = require("../controllers/borrowController");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.use(authMiddleware);

router.get(
  "/my-borrows",
  borrowController.getMyBorrows
);

router.post(
  "/",
  borrowController.borrowBook
);

router.patch(
  "/:id/return",
  borrowController.returnBook
);

module.exports = router;
