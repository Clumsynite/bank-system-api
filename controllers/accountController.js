const accountQueries = require("../db/accountQueries.js");
const knex = require("../db/init.js");

exports.allAccounts = async (req, res) => {
  try {
    const allAcounts = await accountQueries.allAccounts();
    res.json(allAcounts);
  } catch (error) {
    return res.json({ msg: "Error viewing accounts" });
  }
};

exports.viewTransactions = async (req, res) => {
  try {
    return await knex
      .from("accounts")
      .join("users", { "accounts.user_id": "users.user_id" })
      .select("*")
      .where(username);
  } catch (error) {
    return res.json({ msg: "Error viewing Transaction" });
  }
};

exports.withdraw = async (req, res) => {
  try {
    accountQueries.cashWithdrawal({
      user_id: req.user.user_id.toString(),
      cash_withdrawn: Number(req.body.amount),
    });
    res.json(req.user);
  } catch (error) {
    return res.json({ msg: "Error logging Withdrawal" });
  }
};
