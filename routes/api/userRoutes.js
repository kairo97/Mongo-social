const router = require('express').Router();
const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    deleteFriend,
} = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId')
    .put(updateUser)
    .post(addFriend)
    .delete(deleteFriend)
    .get(getSingleUser)
    .delete(deleteUser);

module.exports = router;
