const fs = require('graceful-fs')

const baseDir = "/mnt/33361F09305935AC/Musicas/Autoramas  - Desplugado"

const files = { "directory": baseDir, "files": fs.readdirSync(baseDir) };

module.exports = files
