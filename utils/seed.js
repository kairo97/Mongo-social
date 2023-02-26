const connection = require('../config/connection');
const {User, Post} = require('../models');
const {getRandomEmail, getRandomUsername, getRandomPost} = require('./data')


connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Post.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        const posts = getRandomPost(5);

        const userName = getRandomUsername();
        const email = getRandomEmail();

        users.push({
            userName,
            email,
            posts,
        })
    }

    await User.collection.insertMany(users);

    console.table(users);
    console.info('seeding complete');
    process.exit(0);
})
