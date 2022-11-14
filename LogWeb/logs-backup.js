let fs = require('fs-extra')
let util = require('util')
let moment = require('moment-timezone')
let { spawn } = require('child_process')
require('colors');



class log {
  command
  statusError

  // Lokasi folder untuk Log
  base_dir = `${__dirname}/LogHarian/`

  // Option untuk spawn
  options = {
    shell: true,
    stdio: ['pipe', process.stdout, process.stderr]
  };

  constructor(isi) {
    const waktuGantiFile = isi.waktuGantiFile | '30 menit'

    // TypeFile harus lebih dari 5 menit
    let wgf = waktuGantiFile ? waktuGantiFile.split(' ')
    this.waktuGantiFile = wgf[0] >= 6 ? `${wgf[0]} ${wgf[1]}` : `30 ${wgf[1]}`
  }

  // Membuat garis pemisah
  garis(judul) {
    return `============================== ${judul} ==============================`
  }

  isArray(a) {
    return (!!a) && (a.constructor === Array);
  };

  isObject(a) {
    return (!!a) && (a.constructor === Object);
  }

  // Mengecek folder ada atau tidak
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

  // Mensortir abjad
  sortAscending(arr) {
    return arr.sort(function (f, s) {
      return f > s ? 1 : -1;
    });
  }

  // Mengambil file/folder
  listDir(lok = "", mode = "all") {
    mode = mode.toLowerCase();
    let listnya = fs.readdirSync(lok, { withFileTypes: true }).filter(dirent => mode === "file" ? dirent.isFile() : mode === "folder" ? dirent.isDirectory() : dirent).map(dirent => dirent.name)
    return listnya
  }

  buatCatatan(note, time = moment().tz('Asia/Jakarta')) {
    let tanggal = time.format('DD-MM-YYYY')
    let waktu = time.format('h-mm')
    let lokasiFolder = this.base_dir + tanggal + '/'

    // Jika folder tidak ada, maka akan dibuat otomatis
    if (!this.checkFolder(lokasiFolder)) {
      fs.mkdirsSync(lokasiFolder)
    }

    let listFile = this.listDir(lokasiFolder, 'file')
    let namaFile = `${waktu}.txt`

    // Menentukan File baru atau memakai file lama
    if (listFile > 0) {
      let typeWaktu = this.waktuGantiFile.toLocaleLowerCase().split(' ')
      let namaFileLama = listFile[listFile.length - 1]
      let lokasiFileLama = `${lokasiFolder}${namaFileLama}`

      let waktuLama = lokasiFileLama.split('.')[0]

      let jam = waktu.split('-')[0]
      let jamLama = waktuLama.split('-')[0]

      let menit = waktu.split('-')[1]
      let menitLama = waktuLama.split('-')[1]

      if (typeWaktu[1] == 'menit') {
        if (jam == jamLama) {
          // Jika File kurang dari type waktu yang telah ditentukan, Maka masih memakai File lama
          if ((menitLama - menit) <= typeWaktu[0] > 5 ? typeWaktu[0] : 30) {
            namaFile = `${waktuLama}.txt`
          }
        }
      } else if (typeWaktu[1] == 'jam') {
        // Jika sudah melewati jam yang telah ditentukan, maka akan membuat file baru
        if ((jam - jamLama) < typeWaktu[0]) {
          namaFile = `${waktuLama}.txt`
        }
      }
    }

    // Membuat atau mengedit dan memasukkan hasil log ke dalam file
    fs.appendFile(`${namaFile}`, note + '\n', function (err) {
      if (err) throw err;
    });
  }

  // Memulai mencatat log
  runLog(jam = new Date().toLocaleString('id-ID')) {

    this.command.stdout.on('data', (chnk) => {
      this.buatCatatan(chnk)
      statusServer = 'Bot WhatsApp telah berjalan!!!<br><br>' + chnk
    });

    // this.command.stderr.on('data', (data) => {
    //   let catatan = `${this.garis('ERROR')}\n${jam}\nError: ${data}${this.garis}\n`
    //   this.buatCatatan(catatan)
    //   statusServer = 'Bot WhatsApp Error!!!<br><br>' + data
    //   this.statusError = data
    //   console.log('Errorr: ' + data);
    // });

    this.command.on('exit', (code) => {
      let catatan = `${this.garis('PROJEK STOP')}\n${jam}\nBot Telah Berhenti\n${this.garis}\n`;
      this.buatCatatan(catatan)
      statusServer = 'Bot WhatsApp telah berhenti<br><br>' + statusError
      console.log('Bot telah berhenti - ' + code);
    });
  }

  // Memulai program
  start() {
    // Menjalankan Bot Whatsapp
    this.command = spawn('node', [__dirname + '/../BotWa/index.js'], this.options);
    // this.command.stdout.setEncoding('utf8');

    // Menjalankan Logging dengan mencatat semua aktivitas Bot kedalam 1 file
    this.runLog();
    return 'Bot WhatsApp telah dijalankan'
  }
}

module.exports = log