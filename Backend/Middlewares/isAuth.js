const isAuth = (req, res, next) => {
  if (req.session && req.session.userId) {
    next();
  } else {
    return res.status(401).json({ error: "Please login to access this page." });
  }
};
module.exports = isAuth;
