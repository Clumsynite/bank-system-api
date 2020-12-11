const knex = require("./init");

exports.allAccounts = async () => {
  try {
    return await knex.from("accounts").select("*");
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.viewTransactionByUsername = async (username) => {
  try {
    return await knex.from("users").select("*").where(username);
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.cashWithdrawal = async (transaction) => {
  try {
    return knex("accounts").insert(transaction);
  } catch (error) {
    return error;
  }
};

exports.getUserTotal = async (user) => {
  try {
    console.log(user);
    return await knex
      .from("accounts")
      .select("*")
      .where(user)
      .orderBy("transaction_time", "desc")
      .first();
  } catch (error) {
    return error;
  }
};
