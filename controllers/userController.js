const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userQueries = require("../db/userQueries");
const accountQueries = require("../db/accountQueries");

exports.signup = async (req, res) => {
  try {
    const { username } = req.body;
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    const exists = await userQueries.usernameExists(username);
    if (!exists) {
      const user = await userQueries.insertUser({
        ...req.body,
        password: hashedPassword,
      });
      await accountQueries.cashTransaction({
        user_id: user[0].user_id.toString(),
        total: 0,
      });
      return res.json({ ...user[0], msg: "Signup Successful" });
    } else {
      return res.json({ err: "Username already exists" });
    }
  } catch (error) {
    console.log(error);
    return res.json({ err: "Signup Failed" });
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

          const token = jwt.sign({ ...user[0] }, process.env.JWT_SECRET);
          res.cookie("auth", token);
          res.json({ user: user[0], msg: "Login Successful", token });
        } else {
          res.json({ err: "Login Failed" });
        }
      });
    } else {
      res.json({ err: "Incorrect Username or Account Type" });
    }
  } catch (error) {
    return res.json({ err: "Login Error" });
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
    return res.json({ err: "Error viewing Users" });
  }
};

exports.allCustomers = async (req, res) => {
  try {
    const allCustomers = await userQueries.allCustomers();
    const filterCustomers = Array.from(
      new Set(allCustomers.map((a) => a.username))
    ).map((username) => {
      return allCustomers.find((a) => a.username === username);
    });
    res.json(filterCustomers);
  } catch (error) {
    return res.json({ err: "Error viewing Users" });
  }
};

exports.viewUser = async (req, res) => {
  try {
    const user = await userQueries.viewUserByUsername(req.params);
    if (user.length > 0) {
      return res.json(user);
    } else {
      return req.json({ err: "User not found" });
    }
  } catch (error) {
    return res.json({ err: "User not found" });
  }
};
