const router = require('express').Router();
const {
  getUsers,
  findUser,
  updateUserProfile,
  updateUserAvatar,
  getMe,
} = require('../controllers/users');

router.get('/', getUsers);

router.get('/:userId', findUser);

router.patch('/me', updateUserProfile);

router.patch('/me/avatar', updateUserAvatar);

router.get('/me', getMe);

module.exports = router;
