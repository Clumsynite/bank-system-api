const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userQueries = require("../db/userQueries");

exports.signup = async (req, res) => {
  const { name, username, account, password } = req.body;
  req.body.password = await bcryptjs.hash(req.body.password, 10);
  const exists = await userQueries.usernameExists(username);
  if (!exists) {
    userQueries.insertUser(req.body);
    return res.json({
      name,
      username,
      account,
      password,
      msg: "Signup Successful",
    });
  } else {
    return res.json({ msg: "Username already exists" });
  }
};

exports.login = async (req, res) => {
  const { username, password, account } = req.body;
  try {
    const user = await userQueries.findByUsernameAndAccount({
      username,
      account,
    });
    if (user.length > 0) {
      bcryptjs.compare(password, user[0].password, (err, data) => {
        if (data) {
          user[0].password = "****";

          const token = jwt.sign({ user }, process.env.JWT_SECRET);
          res.cookie("auth", token);
          res.json({ user: user[0], msg: "Login Successful", token });
        } else {
          res.json({ msg: "Login Failed" });
        }
      });
    } else {
      res.json({ msg: "Incorrect Username or Account Type" });
    }
  } catch (error) {
    console.log(error);
    return res.json(error);
  }
};

exports.logout = async (req, res) => {
  res.cookie("auth", "", { maxAge: 0, expires: Date.now() });
  res.json("Logout Successful");
};

exports.allUsers = async (req, res) => {
  try {
    const allUsers = await userQueries.allUsers();
    res.json(allUsers);
  } catch (error) {
    return res.json({ error });
  }
};
