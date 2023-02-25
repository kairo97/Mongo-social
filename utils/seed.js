const connection = require('../config/connection');
const {User, Post} = require('../models');


connection.on('error', (err)=> err);

connection.once('open', async () => {
    console.log('connected');

    await User.deleteMany({});

    await Post.deleteMany({});

    const users = [];

    for (let i = 0; i < 20; i++) {
        
    }
})
