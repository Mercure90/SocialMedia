const express = require('express')
const router = express.Router()

const {
    createPost,
    updatePost,
    deletePost,
    likePost,
    getPost,
    getPostTimeline
} = require('../controllers/post');

router.route('/').post(createPost).get(getPostTimeline);

router.route('/:id')
    .get(getPost)
    .put(updatePost)
    .delete(deletePost);

router.route('/:id/like').put(likePost)

module.exports = router