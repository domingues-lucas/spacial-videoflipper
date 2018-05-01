const multer = require('multer');
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
        // An error occurred when uploading
        console.log(err);
        return res.status(422).send("an Error occured")
        }  
        // No error occured.
        path = req.file.path;
        return res.send("Upload Completed for "+path); 
    });
};

module.exports = uploadService