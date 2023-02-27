const {ObjectId} = require('mongoose').Types;
const { User, Post } = require('../models');

module.exports = {
    getUsers(req,res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },

    getSingleUser(req, res) {
        User.findOne({_id:req.params.userId})
        .select('-__v')
        .then((user) => 
            !user
                ? res.status(404).json({msg: 'No user with that ID'})
                : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
    },

    createUser(req, res) {
        User.create(req.body)
        .then((course) => res.json(course))
        .catch((err) => {
            console.log(err);
            return res.status(500).json(err);
        });
    },
    updateUser(req, res) {
        User.findOneAndUpdate(
            { _id: req.params.userId },
            { $set: req.body },
            { runValidators: true, new: true }
        )
            .then((user) => 
            !user
                ? res.status(500).json({message: "No user found with this ID"})
                : res.json(user)
        )
            .catch((err) => {
                console.log(err);
                res.status(500).json(err);
            });
        },
    deleteUser(req, res) {
        User.findOneAndDelete({_id: req.params.userId })
            .then((user) => 
                !user
                    ? res.status(404).json({message: 'No user with that ID'})
                    : Post.deleteMany({_id: { $in: user.posts}})
            )
            .then(() => res.json({ message: 'User and associated posts deleted'}))
            .catch((err) => res.status(500).json(err));
    },
};