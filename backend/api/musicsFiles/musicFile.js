const fs = require('graceful-fs')
const NodeID3 = require('node-id3')
const baseDir = "/mnt/33361F09305935AC/Musicas/Rolling Stones Discography from 1963 to 2004"

const allFilesSync = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
        const path = require('path');
        const filePath = path.join(dir, file)

        fileList.push(
        fs.statSync(filePath).isDirectory()
            ? {[file]: allFilesSync(filePath)}
            : file
        )
    })
    return fileList
}

console.log()

const allFilesSyncHTML = (dir, fileList = []) => {
    fs.readdirSync(dir).forEach(file => {
        const path = require('path');
        const filePath = path.join(dir, file)

        fileList.push(
            fs.statSync(filePath).isDirectory()
                ? '<ul><li class="folder"><i class="material-icons">folder_open</i>' + file + '</li>' + allFilesSyncHTML(filePath) + '</ul>'
                : file.indexOf('.mp3') !== -1 
                    ? '<li><i class="material-icons">music_note</i>' + file + '</li>' 
                    : null
        )

       //if ( file.indexOf('.mp3') !== -1 ) { console.log(NodeID3.read(dir + '/' +  file).title) }

    })
    return fileList.join('')
}

const files = { "json": allFilesSync(baseDir), "html": allFilesSyncHTML(baseDir) };

module.exports = files
