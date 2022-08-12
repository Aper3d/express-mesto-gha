/* eslint-disable no-console */
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');

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

app.use((req, res, next) => {
  req.user = {
    _id: '62ea8beb11451c71f4ff3683',
  };

  next();
});

app.use('/cards', require('./routes/cards'));
app.use('/users', require('./routes/users'));

app.all('*', (req, res, next) => {
  next(res.status(404).send({ message: 'Неправильный путь' }));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
