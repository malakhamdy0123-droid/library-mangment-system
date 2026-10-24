const { AppDataSource } = require("../config/database");
const Borrow = require("../entities/Borrow");

const getRepository = () => {
  return AppDataSource.getRepository(Borrow);
};

const createBorrow = async (borrowData) => {
  const borrow = getRepository().create(borrowData);

  return await getRepository().save(borrow);
};

const getBorrowById = async (id) => {
  return await getRepository().findOne({
    where: { id },
    relations: {
      user: true,
      book: true
    }
  });
};

const findActiveBorrow = async (id, userId) => {
  return await getRepository().findOne({
    where: {
      id,
      status: "active",
      user: { id: userId }
    },
    relations: {
      user: true,
      book: true
    }
  });
};

const getUserBorrows = async (userId) => {
  return await getRepository().find({
    where: {
      user: { id: userId }
    },