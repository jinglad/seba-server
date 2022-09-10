const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  let token = authHeader.split(" ")[1];
  if (!token) res.status(401).send("Access Denied");
  console.log(token);
  try {
    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    req.user = decode;
    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};

module.exports = {
  verifyToken,
};
