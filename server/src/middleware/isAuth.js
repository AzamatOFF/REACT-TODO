module.exports = function (req, res, next) {

  if (req.session.user) {
    next();
  } else {
    res.status(403).json({ msg: 'Unauthorized' });
  }
};
