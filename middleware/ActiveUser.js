function ensureActiveUser(req, res, next) {
    if (req.user && req.user.isActive) {
      return next();
    } else {
      res.status(403).json({ message: 'User is not active.' });
    }
  }

  module.exports = ensureActiveUser