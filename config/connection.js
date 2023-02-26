const { connect, connection } = require('mongoose');

connect('mongodb://localhost/mongosocial', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

module.exports = connection;