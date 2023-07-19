require('@babel/register');
require('dotenv').config();
const session = require('express-session');
const FileStore = require('session-file-store')(session);

const express = require('express');
const morgan = require('morgan');
const path = require('path');
const cors = require('./src/middleware/cors');

const login = require('./src/routes/login.router');
const registration = require('./src/routes/registration.router');
const logout = require('./src/routes/logout');
const todos = require('./src/routes/todos.routes');

const app = express();
const { PORT, COOKIE_SEKRET } = process.env;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors);

const sessionConfig = {
  name: 'Cookie',
  store: new FileStore(),
  secret: COOKIE_SEKRET ?? '123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 10,
    httpOnly: true,
  },
};

app.use(session(sessionConfig));
app.use(express.static(path.resolve('public')));

app.use(morgan('dev'));
app.use(express.static(path.join(process.cwd(), 'public')));

app.use('/', logout);

app.use('/', registration);
app.use('/', login);

app.use('/', todos);

app.get('*', (req, res) => { res.redirect('/'); });

app.listen(PORT, () => {
  console.log(`Сервер запущен порт: ${PORT}`);
});
