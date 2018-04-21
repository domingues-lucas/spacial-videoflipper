const express = require('express');
const musicQuerys = require('../api/musics/musicQuerys');

module.exports = function(server) {

  //API Routes
  const router = express.Router();
  server.use('/api', router);

  //Registering API methods in router
  const musicService = require('../api/musics/musicService');
  musicService.register(router, '/music');

  const musicFileService = require('../api/musicsFiles/musicFileService');
  //musicFileService.register(router, '/musicFile');

  router.get('/files', function (req, res, next) {
    res.send(musicFileService);
  });

  //Search's routes
  router.get('/search-title/:title', musicQuerys.searchByTitle);

}