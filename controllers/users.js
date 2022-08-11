const User = require('../models/user');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => res.send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.findUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .then((data) => res.send({ data }))
    .catch(() => res.status(404).send({ message: 'Нет пользователя с таким id' }));
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.updateUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { name, about, avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err.message}` }));
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.params.id,
    { avatar },
    {
      new: true,
      runValidators: true,
      upsert: true,
    },
  )
    .then((user) => res.send({ data: user }))
    .catch((err) => res.status(400).send({ message: `Произошла ошибка ${err.message}` }));
};
