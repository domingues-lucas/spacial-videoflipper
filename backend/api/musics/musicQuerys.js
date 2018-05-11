const Music = require('./music');
const fs = require('graceful-fs');

const searchByTitle = (req, res, next) => {
    const urlParameter = req.params.title;
    // Find the objet by name
    Music.find({'title' : urlParameter}, (err, music) => {
        if (err) {
            return handleError(err);
        } else {
            res.json(music);
        }
    });
};

const searchByMD5 = (req, res, next) => {
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

module.exports = { searchByTitle, searchByMD5, deleteFile }

