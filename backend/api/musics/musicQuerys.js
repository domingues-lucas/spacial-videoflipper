const Music = require('./music');
const fs = require('graceful-fs');

const searchByTitle = (req, res) => {
    const urlParameter = new RegExp(['^', req.params.title].join(''), 'i');
    Music.find({'title' : urlParameter}, (err, music) => {
        if (err) {
            return handleError(err);
        } else {
            res.json(music);
        }
    });
};

const searchByArtist = (req, res) => {
    const urlParameter = new RegExp(['^', req.params.artist].join(''), 'i');
    Music.find({'artist' : urlParameter}, (err, music) => {
        if (err) {
            return handleError(err);
        } else {
            res.json(music);
        }
    });
};

const searchByMD5 = (req, res) => {
    const urlParameter = req.params.md5;
    Music.find({'md5' : urlParameter}, (err, music) => {
        if (err) {
            return console.log(err);
        } else {
            res.json(music);
        }
    });
};

const deleteFile = (req, res, next) => {
    console.log(req.body.filePath);
    fs.unlink(req.body.filePath, function(err){
        if (err) {
            return console.log(err);
        } else {
            res.json('Música excluída pois já existe: ' + req.body.filePath);
        }
    });
};

module.exports = { searchByTitle, searchByArtist, searchByMD5, deleteFile }

