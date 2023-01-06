const express = require('express')
const router = express.Router()

const {   updateUser,
    deleteUser,
    getUser
    } = require('../controllers/user')

router.route('/:id').get(getUser).put(updateUser).delete(deleteUser);


module.exports = router
