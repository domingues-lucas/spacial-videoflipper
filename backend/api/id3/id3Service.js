const NodeID3 = require('node-id3')

function id3Service (req, res, next) {
    let item = NodeID3.read(req.body.filePath)
    item = {
        title: item.title,
        artist: item.artist,
        album: item.album
    }
    res.send(item)
}

module.exports = id3Service