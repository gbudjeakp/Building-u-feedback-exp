const limiter = require("express-rate-limit");

//Might Need to find good number of requests per window
//Need to find appropriate windows 1min might be too short.
const rateLimiter = limiter({
  windowMs: 1 * 60 * 1000,
  max: 150,
  message: "Too many requests, please try again later.",
});

module.exports = rateLimiter;
