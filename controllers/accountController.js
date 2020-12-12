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
    const transactions = await accountQueries.viewUserTransactions(req.params);
    res.json(transactions);
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
    if (total.total < amount) {
      return res.json({ err: "No sufficient Fund" });
    } else {
      await accountQueries.cashTransaction({
        user_id: req.user.user_id.toString(),
        cash_withdrawn: amount,
        total: total.total - amount,
      });
      res.json({ msg: "Withdrawal successful" });
    }
  } catch (error) {
    return res.json({ err: "Error logging Withdrawal" });
  }
};

exports.deposit = async (req, res) => {
  try {
    const amount = Number(req.body.amount);
    const total = await accountQueries.getUserTotal({
      user_id: req.user.user_id.toString(),
    });
    accountQueries.cashTransaction({
      user_id: req.user.user_id.toString(),
      cash_deposited: amount,
      total: total.total + amount,
    });
    res.json({ msg: "Deposit successful" });
  } catch (error) {
    return res.json({ err: "Error logging Deposit" });
  }
};

exports.balance = async (req, res) => {
  try {
    const balance = await accountQueries.getUserTotal({
      user_id: req.params.user_id,
    });
    return res.json({
      msg: `Total balance is ${balance.total}`,
      balance: balance.total,
      latest: balance,
    });
  } catch (error) {
    return res.json({ err: "Error getting balance" });
  }
};
