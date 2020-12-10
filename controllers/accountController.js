const accountQueries = require("../db/accountQueries.js");

exports.allAccounts = async (req, res) => {
  try {
    const allAcounts = await accountQueries.allAccounts();
    res.json(allAcounts);
  } catch (error) {
    return res.json({ error });
  }
};
