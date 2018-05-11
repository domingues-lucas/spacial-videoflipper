const multer = require('multer');
const md5File = require('md5-file');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '/home/ninguem/Música')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});

const upload = multer({ storage }).single('music');

function uploadService (req, res, next) {
    var path = '';
    upload(req, res, function (err) {
        if (err) {
            console.log(err);
            return res.status(422).send("an Error occured")
        }  
        path = req.file.path;
        return res.json({'filePath': path, 'md5': md5File.sync(path)});
    });
};

module.exports = uploadService