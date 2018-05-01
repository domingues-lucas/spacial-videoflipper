const NodeID3 = require('node-id3')
const md5File = require('md5-file')

function id3Service (req, res, next) {
    var item = NodeID3.read(req.body.file)
        item.md5 = md5File.sync(req.body.file)
    res.send(item)
}

module.exports = id3Service