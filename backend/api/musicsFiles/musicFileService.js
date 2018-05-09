const fs = require('graceful-fs')
const baseDir = "/home/ninguem/Música"

var fileList = [];

const allFilesSync = (dir) => {
    fs.readdirSync(dir).forEach(file => {
        const path = require('path');   
        const filePath = path.join(dir, file)

    // fs.statSync(filePath).isDirectory()
    //     ? fileList.push({[file]: allFilesSync(filePath)}) : file.indexOf('.mp3') !== -1 
    //     ? fileList.push(filePath) : null

    fs.statSync(filePath).isDirectory()
        ? allFilesSync(filePath) : file.indexOf('.mp3') !== -1 
        ? fileList.push(filePath) : null
    })

    return fileList
}


const allFilesSyncHTML = (dir, fileList = []) => {
    // fs.readdirSync(dir).forEach(file => {
    //     const path = require('path');
    //     const filePath = path.join(dir, file)

    //     fileList.push(
    //         fs.statSync(filePath).isDirectory()
    //             ? '<ul><li class="folder"><i class="material-icons">folder_open</i>' + file + '</li>' + allFilesSyncHTML(filePath) + '</ul>'
    //             : file.indexOf('.mp3') !== -1 
    //                 ? '<li><i class="material-icons">music_note</i>' + file + '</li>' 
    //                 : null
    //     )

    //    //if ( file.indexOf('.mp3') !== -1 ) { console.log(NodeID3.read(dir + '/' +  file).title) }

    // })
    // return fileList.join('')
}

const MusicFile = { 
    refresh : function() { 
        this.json = allFilesSync(baseDir)
        this.html = allFilesSyncHTML(baseDir)
    }
};

module.exports = MusicFile
