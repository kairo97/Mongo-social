const router = require('express').Router();
const {
    getPosts,
    getSinglePost,
    createPost,
    updatePost,
    deletePost,
} = require('../../controllers/thoughtController');

router.route('/').get(getPosts).post(createPost);

router.route('/:thoughtId').get(getSinglePost).put(updatePost).delete(deletePost);

module.exports = router;