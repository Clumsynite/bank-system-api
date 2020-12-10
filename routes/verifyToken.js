const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = req.cookies.auth;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).send("Error");
      }
      req.user_data = data;
      next();
    });
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.status(403).send("Error");
      }
      req.user_data = data;
      next();
    });
  } else {
    return res.status(401);
  }
};

module.exports = verifyToken;
