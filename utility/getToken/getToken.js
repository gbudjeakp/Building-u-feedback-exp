const jwt = require("jsonwebtoken");
module.exports = (req) => {
  const { authToken } = req.cookies;
  const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);
  return { id: id, username: username };
};
