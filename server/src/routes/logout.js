const router = require('express').Router();

router.get('/logout', (req, res) => {
  try {
    if (req.session.user) {
      req.session.destroy();
      res.clearCookie('Cookie');
      res.sendStatus(200);
    }
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
