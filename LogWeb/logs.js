let fs = require('fs-extra')
let util = require('util')
let moment = require('moment-timezone')
let { spawn } = require('child_process')
require('colors');



class log {
  command
  base_dir = `${__dirname}/LogHarian/`
  garis = "=======================================================";

  constructor() {
  }

  checkFolder(dirPath) {
    try {
      // Query the entry
      var stats = fs.lstatSync(dirPath);
      // Is it a directory?
      if (stats.isDirectory()) return true
    } catch (e) {
      return false
    }
  };

  sortAscending(arr) {
    return arr.sort(function (f, s) {
      return f > s ? 1 : -1;
    });
  }

  buatCatatan(note, time = moment().tz('Asia/Jakarta')) {
    let namaFile = `${time.format('h-mm')}.txt`
    let namaFolder = `${this.base_dir}${time.format('DD-MM-YYYY')}`

    if (!this.checkFolder(namaFolder)) {
      fs.mkdirsSync(namaFolder)
    }

    fs.appendFile(`${namaFolder}${namaFile}`, note + '\n', function (err) {
      if (err) throw err;
    });
  }

  runLog(jam = new Date().toLocaleString('id-ID')) {
    let catatan;

    this.command.stderr.on('data', (data) => {
      catatan = `${this.garis}\n${jam}\nError: ${data}${this.garis}\n`
      this.buatCatatan(catatan)
      console.log('Errorr: ' + data);
    });

    this.command.on('exit', (code) => {
      catatan = `${this.garis}\n${jam}\nBot Telah Berhenti\n${this.garis}\n`;
      this.buatCatatan(catatan)
      console.log('Bot telah berhenti - ' + code);
    });
  }

  start() {
    this.command = spawn('node', [__dirname + '/../index.js']);
    this.runLog()
    return 'done'
  }
}

module.exports = log