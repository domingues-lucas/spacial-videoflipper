const Music = require('./music');

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
            return handleError(err);
        } else {
            res.json(music);
        }
    });
};

module.exports = { searchByTitle, searchByMD5 }

