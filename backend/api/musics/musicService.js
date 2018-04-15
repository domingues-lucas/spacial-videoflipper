const Music = require('./music');

//Create REST API, adds CRUD to Mongog's schema
Music.methods(['get', 'post', 'put', 'delete']);

//Return post/put methods updated
Music.updateOptions({new: true, runValidators: true});

module.exports = Music
