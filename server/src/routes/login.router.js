const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

router.post('/login', async (req, res) => {
  try {
    const { login, password } = req.body;
    const checkUser = await User.findOne({ where: { login }, attributes: ['id', 'login', 'name', 'password'], raw: true });

    if (checkUser) {
      const checkPass = await bcrypt.compare(password, checkUser.password);
      if (!checkPass) {
        return res.status(401).json({ msg: 'Try again' });
      }
      if (checkPass) {
        delete checkUser.password;
        req.session.user = checkUser;
        return res.json(checkUser);
      }
    }
    if (!checkUser) {
      return res.status(401).json({ msg: 'Try again' });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
