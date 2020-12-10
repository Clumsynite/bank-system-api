const knex = require("./init");

exports.allAccounts = async () => {
  try {
    return await knex.from("accounts").select("*");
  } catch (error) {
    console.log(error);
    return error;
  }
};
