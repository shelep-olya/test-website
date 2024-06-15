const jwt = require("jsonwebtoken");
const isAuth = (req) => {
  const token = req.cookies.jwt;
  return token && jwt.verify(token, process.env.JWT_SECRET);
};
const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
const createAndSendToken = (user, statusCode, res, redirectUrl, locals) => {
  const token = signToken(user._id);
  res.cookie("jwt", token, {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  });
  res.status(statusCode).render(redirectUrl, { user, ...locals });
};
module.exports = { createAndSendToken };
