const jwt = require('jsonwebtoken');
const db = require("../Models/index");
const User = db.User;

module.exports = async (req, res, next) => {
  try {
    const { authToken } = req.cookies;


    if (!authToken) throw new Error('Unauthenticated');

    const { id } = jwt.verify(authToken, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: id } });


    if (!user) throw new Error('Unauthenticated');

    res.locals.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Unauthenticated' });
  }
};
