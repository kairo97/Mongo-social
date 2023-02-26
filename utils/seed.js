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
    const posts = getRandomPost(20);
    const password = getRandomPassword();
    const username = getRandomUsername();
    const email = getRandomEmail();

    users.push({
      username,
      email,
      password,
      posts,
    });
  }

  await User.collection.insertMany(users);

  const posts = [];
  
  for (let i = 0; i < 20; i++) {
    const content = `This is the content for Post ${i + 1}`;
    posts.push({ content });
  }
  
  await Post.collection.insertMany(posts);

  console.table(users);
  console.info('seeding complete');
  process.exit(0);
});
