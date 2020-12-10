const accountQueries = require("../db/accountQueries.js");

exports.allAccounts = async (req, res) => {
  try {
    const allAcounts = await accountQueries.allAccounts();
    console.log(allAcounts);
    res.json(allAcounts);
  } catch (error) {
    return res.status(500).json({ error });
  }
};
