const { connect, connection } = require('mongoose');

const connectionString = 'mongodb://localhost:27017/socialapi';

connect(connectionString);

module.exports = connection;
