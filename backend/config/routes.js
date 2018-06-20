const express = require('express');
const musicQuerys = require('../api/musics/musicQuerys');

module.exports = function(server) {

    //API Routes
    const router = express.Router();
    server.use('/api', router);
    server.use('/files/', express.static('/home/ninguem/Música/'));

    //Registering API methods in router
    const musicService = require('../api/musics/musicService');
    musicService.register(router, '/music');

    const musicFileService = require('../api/musicsFiles/musicFileService');
    router.get('/files', function (req, res, next) {
    musicFileService.refresh();
    res.send(musicFileService);
    });

    const id3Service = require('../api/id3/id3Service');
    router.post('/files/id3', id3Service);

    const uploadService = require('../api/upload/uploadService');
    router.post('/upload', uploadService);

    router.get('/search/artist/:artist', musicQuerys.searchByArtist);
    router.get('/search/title/:title', musicQuerys.searchByTitle);
    router.get('/search/md5/:md5', musicQuerys.searchByMD5);
    router.post('/files/delete', musicQuerys.deleteFile);

}