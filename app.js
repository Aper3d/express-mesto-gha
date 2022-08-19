/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const defaultError = require('./errors/defaultError');
require('dotenv').config();

const { PORT = 3000 } = process.env;

const app = express();

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: true,
});

app.post('/signin', login);
app.post('/signup', createUser);

app.use(auth);

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.all('*', (req, res, next) => {
  next(new NotFoundError('Не правильный путь'));
});

app.use(defaultError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
