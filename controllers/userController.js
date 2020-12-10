const bcryptjs = require("bcryptjs");
const userQueries = require("../db/userQueries");

exports.signup = async (req, res) => {
  const { name, username, account, password } = req.body;
  req.body.password = await bcryptjs.hash(req.body.password, 10);
  const exists = await userQueries.usernameExists(username);
  if (!exists) {
    userQueries.insertUser(req.body);
    return res.json({ name, username, account, password });
  } else {
    return res.json({ msg: "Username already exists" });
  }
};

exports.login = async (req, res) => {
  const { username, password, account } = req.body;
  try {
    const user = await userQueries.findByUsername(username);
    if (user.length > 0) {
      bcryptjs.compare(password, user[0].password, (err, data) => {
        if (data) {
          user[0].password = "****";
          res.json({ user: user[0], msg: "Login Successful" });
        } else {
          res.json({ msg: "Login Failed" });
        }
      });
    } else {
      res.json({ msg: "Incorrect Username" });
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};
