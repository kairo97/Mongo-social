const connection = require('../config/connection');
const {User, Post} = require('../models');
const {getRandomEmail, getRandomUsername, getRandomPost, getRandomPassword} = require('./data')

connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Post.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const password = getRandomPassword();
        const username = getRandomUsername();
        const email = getRandomEmail();
        const posts = getRandomPost(20); // create an array of posts for each user
        users.push({
            username,
            email,
            password,
            posts // push the array of posts into the user object
        });
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('seeding complete');
    process.exit(0);
});
