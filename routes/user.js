const express = require('express')
const router = express.Router()

const {   updateUser,
    deleteUser,
    getUser,
    followUser,
    unfollowUser
    } = require('../controllers/user')

router.route('/:id')
    .get(getUser)
    .put(updateUser)
    .delete(deleteUser);


router.route('/:id/follow').put(followUser);
router.route('/:id/unfollow').put(unfollowUser);

module.exports = router
