const knex = require("./init");

exports.allAccounts = async () => {
  try {
    const response = await knex.from('accounts').select('*')
    return response
  } catch (error) {
    console.log(error);
    return error;
  }
};
