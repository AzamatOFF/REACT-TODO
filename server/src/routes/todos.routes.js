const router = require('express').Router();
const isAuth = require('../middleware/isAuth');
const userTodo = require('../middleware/userTodo');
const { Todo, User } = require('../../db/models');

router.get('/rests', async (req, res) => {
  try {
    const todos = await Todo.findAll({ order: [['createdAt', 'DESC']] });
    res.json(todos);
    const count = todos.map((el) => el.get({ plain: true })).length;
    console.log('Count of tasks ', count);
  } catch (error) {
    console.log(error);
  }
});

router.post('/todo', isAuth, async (req, res) => {
  try {
    const { input, status } = req.body;
    const todo = await Todo.create({ title: input, status, userId: req.session.user.id });
    const user = await User.findByPk(req.session.user.id);
    res.json({ ...todo.get(), User: user });
    console.log('Todo is created');
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
});

router.patch('/:data', userTodo, async (req, res) => {
  try {
    const { data } = req.params;
    const { status } = req.body;
    console.log(req.body);
    const change = await Todo.update({ status }, { where: { id: data } });
    console.log(change);
    res.json({ msg: `Task № ${data} is updated` });
  } catch (error) {
    console.log(error);
  }
});

router.put('/:data', userTodo, async (req, res) => {
  try {
    const { data } = req.params;
    const { title } = req.body;
    const change = await Todo.update({ title }, { where: { id: data } });
    res.json({ msg: `Task № ${data} is updated` });
  } catch (error) {
    console.log(error);
  }
});
router.delete('/:data', userTodo, async (req, res) => {
  try {
    const { data } = req.params;
    const delet = await Todo.destroy({ where: { id: data } });
    console.log(delet);
    res.json({ msg: `Task № ${data} is deleted` });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
