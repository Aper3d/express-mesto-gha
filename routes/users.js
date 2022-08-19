const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const reg = require('../utils/isLink');

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
      avatar: Joi.string().pattern(reg).required(),
    }),
  }),
  updateUserAvatar,
);

module.exports = router;
