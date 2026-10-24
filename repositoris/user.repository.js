
const { AppDataSource } = require("../config/database");
const User = require("../entities/User");

const getRepository = () => {
  return AppDataSource.getRepository(User);
};

const createUser = async (userData) => {
  const user = getRepository().create(userData);

  return await getRepository().save(user);
};

const findByEmail = async (email) => {
  return await getRepository().findOneBy({ email });
};

const findById = async (id) => {
  return await getRepository().findOneBy({ id });
};

module.exports = {
  createUser,
  findByEmail,
  findById
};
