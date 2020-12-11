const knex = require("./init");

exports.allAccounts = async () => {
  try {
    return await knex.from("accounts").select("*");
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.viewUserTransactions = async (username) => {
  try {
    return await knex("accounts")
      .join("users", {
        "accounts.user_id": "users.user_id",
      })
      .select(
        "transaction_id",
        "transaction_time",
        "accounts.user_id",
        "username",
        "cash_withdrawn",
        "cash_deposited",
        "total",
        "account"
      )
      .where(username)
      .orderBy("transaction_time", "desc");
  } catch (error) {
    console.log(error);
    return error;
  }
};

exports.cashTransaction = async (transaction) => {
  try {
    return await knex("accounts").insert(transaction);
  } catch (error) {
    return error;
  }
};

exports.getUserTotal = async (user) => {
  try {
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
