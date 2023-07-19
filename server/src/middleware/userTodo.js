const { Todo } = require('../../db/models');

module.exports = function (req, res, next) {
  Todo
    .findByPk(req.params.data)
    .then((post) => {
      if (post.userId === req.session.user.id) {
        next();
      } else {
        res.status(403).json({ msg: 'Unauthorized' });
      }
    })
    .catch((err) => res.status(400).json({ msg: err.message }));
};
