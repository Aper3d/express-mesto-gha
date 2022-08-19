const Card = require('../models/card');
const ValidationError = require('../errors/ValidationError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError('Переданы некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  const removeCard = () => {
    Card.findByIdAndRemove(req.params.cardId)
      .then((card) => res.send(card))
      .catch(next);
  };

  Card.findById(req.params.cardId)
    .orFail(() => next(new NotFoundError('Не найдена карточка')))
    .then((card) => {
      if (req.user._id === card.owner.toString()) {
        return removeCard();
      }
      return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError('Не найдена карточка')))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .orFail(() => next(new NotFoundError('Не найдена карточка')))
    .then((card) => res.send({ data: card }))
    .catch(next);
};

// .catch((err) => {
//   if (err.name === 'CastError') {
//     res.status(400).send({ message: 'Переданы некорректные данные' });
//   } else {
//     res.status(500).send({ message: 'Ошибка сервера' });
//   }
// });
