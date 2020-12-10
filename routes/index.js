const router = require("express").Router();
const userController = require("../controllers/userController");

router.get("/", (req, res, next) => {
  res.send("<h1>HOME</h1>");
});

router.post("/signup", userController.signup);

router.post("/login", userController.login);

module.exports = router;
