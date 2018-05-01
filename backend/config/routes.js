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
  router.get('/files', function (req, res, next) {
    res.send(musicFileService);
  });

  const id3Service = require('../api/id3/id3Service');
  router.post('/files/id3', id3Service);

  const uploadService = require('../api/upload/uploadService');
  router.post('/upload', uploadService);

  //Search's routes
  router.get('/search-title/:title', musicQuerys.searchByTitle);

}