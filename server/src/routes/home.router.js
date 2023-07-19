const router = require('express').Router();
const { Restaurant, User } = require('../../db/models');

router
  .route('/rests')
  .get(async (req, res) => {
    try {
      const posts = await Restaurant.findAll();
      res.json(posts);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  })
  .post(async (req, res) => {
    try {
      const post = await Restaurant.create({ ...req.body, userId: req.session.user.id });
      const user = await User.findByPk(req.session.user.id);
      res.json({ ...post.get(), User: user });
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  });

router
  .route('/:postId')
  .get(async (req, res) => {
    try {
      const post = await Restaurant.findByPk(req.params.postId, { include: User });
      res.json(post);
    } catch (error) {
      console.log(error);
      res.status(400).json({ msg: error.message });
    }
  });

module.exports = router;
