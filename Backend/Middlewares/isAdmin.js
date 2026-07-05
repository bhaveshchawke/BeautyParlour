const isAdmin = (req, res, next) => {
  if (req.session && req.session.userId && req.session.isAdmin) {
    next();
  } else {
    return res.status(401).json({ error: "Access Denied!." });
  }
};
module.exports = isAdmin;
