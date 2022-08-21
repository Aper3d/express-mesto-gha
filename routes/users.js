const routes = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getUsers,
  findUser,
  updateUserProfile,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

routes.get('/', getUsers);

routes.get('/me', getMe);

routes.get(
  '/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().length(24).hex().required(),
    }),
  }),
  findUser,
);

routes.patch(
  '/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(30),
    }),
  }),
  updateUserProfile,
);

routes.patch(
  '/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required().pattern(/https?:\/\/(w{3}\.)?[-\w@:%.+~#=]+\.[\w()]+([-\w()@:%+.~#?&=/]*)/),
    }),
  }),
  updateUserAvatar,
);

module.exports = routes;
