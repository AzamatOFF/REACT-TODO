const router = require('express').Router();
const bcrypt = require('bcrypt');

const { User } = require('../../db/models');

router.get('/', async (req, res) => {
  try {
    res.json(req.session.user || null);
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

router.post('/registration', async (req, res) => {
  try {
    const {
      name, login, password,
    } = req.body;
    const checkLogin = await User.findOne({ where: { login } });
    if (!checkLogin) {
      const hash = await bcrypt.hash(password, 10);
      const user = (await User.create({
        name, login, password: hash,
      })).get();
      delete user.password;
      delete user.createdAt;
      delete user.updatedAt;
      req.session.user = user;
      return res.json(user);
    }
    if (checkLogin) {
      const message = 'Пользователь уже зарегестрирован';
      res.json({ msg: message });
    }
  } catch (error) {
    return res.status(400).json({ msg: error.message });
  }
});

module.exports = router;
