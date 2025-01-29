const jwt = require("jsonwebtoken");
const getToken = (req) => {
  const { authToken } = req.cookies;
  const { id, username } = jwt.verify(authToken, process.env.JWT_SECRET);
  return { id: id, username: username };
};
module.exports = {
  getToken,
};
