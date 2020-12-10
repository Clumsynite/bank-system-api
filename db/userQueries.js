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
