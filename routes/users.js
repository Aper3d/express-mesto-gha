const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  findUser,
  updateUserProfile,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/me', getMe);

router.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  findUser,
);

router.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
);

router.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().regex(/(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!-]))?/),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
