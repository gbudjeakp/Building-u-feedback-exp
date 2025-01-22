const jwt = require("jsonwebtoken");
const getToken = (req) => {
  const { authToken } = req.cookies;
  const { id } = jwt.verify(authToken, process.env.JWT_SECRET);
  return id;
};
module.exports = {
  getToken,
};
