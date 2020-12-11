const router = require("express").Router();
const userController = require("../controllers/userController");
const accountController = require("../controllers/accountController");
const verifyToken = require("./verifyToken");

router.get("/", (req, res, next) => {
  res.send("<h1>HOME</h1>");
});

router.post("/signup", userController.signup);

router.post("/login", userController.login);

router.post("/logout", userController.logout);

router.get("/all/users/", verifyToken, userController.allUsers);

router.get("/all/accounts", verifyToken, accountController.allAccounts);

router.get("/user/:username/profile", verifyToken, userController.viewUser);

router.get(
  "/user/:username/transactions",
  verifyToken,
  accountController.viewTransactions
);

router.post("/account/withdraw", verifyToken, accountController.withdraw);

router.post("/account/deposit", verifyToken, accountController.deposit);

module.exports = router;
