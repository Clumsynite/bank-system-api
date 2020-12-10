const { column, whereExists } = require("./init");
const knex = require("./init");

exports.insertUser = (user) => {
  knex("users")
    .insert(user)
    .then((data) => {
      return knex.from("users").select("*").where("username", user.username);
    })
    .catch((err) => {
      console.log(err);
      return err;
    });
};

exports.findByUsername = async (username) => {
  return knex
    .from("users")
    .select("*")
    .where("username", username)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

exports.usernameExists = async (username) => {
  return knex
    .from("users")
    .select("*")
    .where("username", username)
    .then((result) => result.length > 0)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

exports.findByUsernameAndAccount = async (user) => {
  return knex
    .from("users")
    .select("*")
    .where(user)
    .then((result) => result)
    .catch((error) => {
      console.log(error);
      return error;
    });
};

exports.allUsers = async () => {
  try {
    return await knex.from("users").select("*");
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.viewUserByUsername = async (username) => {
  try {
    return await knex.from("users").select("*").where(username);
  } catch (error) {
    console.log(error);
    return error;
  }
};
