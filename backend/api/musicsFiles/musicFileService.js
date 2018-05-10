const fs = require('graceful-fs');
const md5File = require('md5-file');
const baseDir = "/home/ninguem/Música";

const allFilesSync = (dir) => {
    let fileList = [];
    fs.readdirSync(dir).forEach(file => {
    const path = require('path');   
    const filePath = path.join(dir, file)

    // fs.statSync(filePath).isDirectory()
    //     ? fileList.push({[file]: allFilesSync(filePath)}) : file.indexOf('.mp3') !== -1 
    //     ? fileList.push(filePath) : null

    fs.statSync(filePath).isDirectory()
        ? allFilesSync(filePath) : file.indexOf('.mp3') !== -1 
        ? fileList.push({'filePath': filePath, 'md5': md5File.sync(filePath)}) : null
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
        this.json = allFilesSync(baseDir),
        this.html = allFilesSyncHTML(baseDir)
    }
};

module.exports = MusicFile
