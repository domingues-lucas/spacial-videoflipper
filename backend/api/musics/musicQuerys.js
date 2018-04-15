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

module.exports = { searchByTitle }

