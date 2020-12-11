const accountQueries = require("../db/accountQueries.js");
const knex = require("../db/init.js");

exports.allAccounts = async (req, res) => {
  try {
    const allAcounts = await accountQueries.allAccounts();
    res.json(allAcounts);
  } catch (error) {
    return res.json({ err: "Error viewing accounts" });
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
    return res.json({ err: "Error viewing Transaction" });
  }
};

exports.withdraw = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const total = await accountQueries.getUserTotal({
      user_id: req.user.user_id.toString(),
    });
    if (total > amount) {
      return res.json({ err: "No sufficient Fund" });
    } else {
      accountQueries.cashWithdrawal({
        user_id: req.user.user_id.toString(),
        cash_withdrawn: amount,
      });
      res.json({ msg: "Withdrawal successful" });
    }
  } catch (error) {
    return res.json({ msg: "Error logging Withdrawal" });
  }
};
