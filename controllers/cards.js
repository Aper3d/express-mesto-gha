const Card = require('../models/card');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send({ data: cards }))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.send({ data: card }))
    .catch(next);
};

module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .orFail(() => {
      throw new NotFoundError('Карточка  не найдена');
    })
    .then((card) => {
      if (!card.owner.equals(req.user._id)) {
        return next(new ForbiddenError('Вы не можете удалить чужую карточку'));
      }
      return card.remove()
        .then(() => {
          res.send({ message: 'Карточка удалена' });
        });
    }).catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFoundError('Переданный id не найден');
      }
      res.send({ data: like });
    })
    .catch(next);
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((like) => {
      if (!like) {
        throw new NotFoundError('Переданный id не найден');
      }
      res.send({ data: like });
    })
    .catch(next);
};
