const restful = require('node-restful')
const mongoose = restful.mongoose

const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    artist: { type: String, required: true },
    album: { type: String, required: true },
    file: { type: String, required: true }
})

module.exports = restful.model('Music', itemSchema)
