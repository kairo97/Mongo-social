const { Post, User } = require('../models');

module.exports = { 

    getPosts(req, res) {
        Post.find()
        .then((posts) => res.json(posts))
        .catch((err) => res.status(500).json(err));
    },
    getSinglePost(req, res) {
        Post.findOne({_id: req.parmas.postId })
            .then((post) =>
                !post
                    ? res.status(404).json({message: 'No posts found with that ID'})
                    : res.json(post)
            )
            .catch((err)=> res.status(500).json(err));
    },
    createPost(req, res) {
        Post.create(req.body)
            .then((post) => {
                return User.findOneAndUpdate(
                    {_id: req.body.userId},
                    {$addToSet: { posts: post._id } },
                    { new: true }
                );
            })
            .then((user) => 
            !user
                ? res.status(404).json({
                    message: 'Post created, but no user found with that ID',
                })
                : res.json('created the Post')
            )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err)
            });
    },
    updatePost(req, res) {
        Post.findOneAndUpdate(
            { _id: req.params.postId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((post) => 
            !post
                ? res.status(500).json({message: "No post found with thsi ID"})
                : res.json(post)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
    },
    deletePost(req, res) {
        Post.findOneAndRemove({_id: req.params.postId })
            .then((post) => 
                !post
                    ? res.status(404).json({message: 'No post with this ID'})
                    : User.findOneAndUpdate(
                        { posts: req.params.postId },
                        { $pull: { posts: req.params.postId }},
                        { new: true}
                    )
        )
        .then((user) => 
            !user
                ? res.status(404).json({
                    message: 'Post created but no user with this ID'
                })
                : res.json({ message: 'Post successfully deleted!' })
        )
        .catch((err) => res.status(500).json(err));
    }

}