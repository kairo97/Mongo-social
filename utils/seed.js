const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomEmail, getRandomUsername, getRandomPost, getRandomPassword } = require('./data')

connection.on('error', (err) => err);

connection.once('open', async () => {
  console.log('connected');

  await User.deleteMany({});
  await Thought.deleteMany({});

  const users = [];
  const thoughts = [];

  for (let i = 0; i < 20; i++) {
    const password = getRandomPassword();
    const username = getRandomUsername();
    const email = getRandomEmail();
    const user = await User.create({ username, email, password }); // create user document
    users.push(user); // add user document to users array

    const post = getRandomPost(); // create a thought document
    const thought = await Thought.create({ thoughtText: post, username: user.username }); // add user reference to thought document
    thoughts.push(thought); // add thought document to thoughts array
  }

  console.table(users);
  console.table(thoughts);
  console.info('seeding complete');
  process.exit(0);
});

