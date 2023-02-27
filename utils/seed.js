const connection = require('../config/connection');
const {User, Thought} = require('../models');
const {getRandomEmail, getRandomUsername, getRandomPost, getRandomPassword} = require('./data')

connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});
    await Thought.deleteMany({});

    const users = [];
    const posts = [];
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
        posts.push({
            posts
        })
    }

    await User.collection.insertMany(users);
    await Thought.collection.insertMany(posts);
    console.table(users);
    console.info('seeding complete');
    process.exit(0);
});
