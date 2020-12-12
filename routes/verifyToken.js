const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  const bearerHeader = req.headers["authorization"];
  const token = req.cookies.auth;
  if (bearerHeader) {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    jwt.verify(bearerToken, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.json({ err: "Token doen't match" });
      }
      req.user = data;
      next();
    });
  } else if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
      if (err) {
        return res.json({ err: "Token doen't match" });
      }
      req.user = data;
      next();
    });
  } else {
    return res.json({ err: "Token not Found" });
  }
};

module.exports = verifyToken;
