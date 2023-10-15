const jwt = require('jsonwebtoken');
const db = require("../Models/index");
const User = db.User;

module.exports = async (req, res, next) => {
    try {
      const { token } = req.cookies;
      if (!token) throw new Error('Unauthenticated');
      
  
      const { id } = jwt.verify(token, process.env.JWT_SECRET);

      const user = await User.findOne({ id: id });
  
      if (!user) throw new Error('Unauthenticated');
  
      res.locals.user = user;
      res.locals.user.id = id
  
      next();
    } catch (error) {
      return res.status(401).json({ error: 'Unauthenticated' });
    }
  }; 