const winston = require('winston')
const moment = require('moment-timezone')
const fs = require('fs-extra')
const DailyRotate = require('winston-daily-rotate-file')

class log {
  base_dir = `${process.env.base_log}LogHarian/`
  time = moment().tz('Asia/Jakarta')
  constructor(isi = {}) {
    const { waktuGantiFile } = isi

    // Menit, Jam, Hari
    this.typeWaktuGantiFile = waktuGantiFile ? waktuGantiFile.split(' ') : '30 menit'.split(' ')
    this.waktuGantiFile = wgf[0] >= 6 ? `${wgf[0]} ${wgf[1]}` : `30 ${wgf[1]}`

    this.time = moment().tz('Asia/Jakarta')
    this.namaFile = this.time.format('HH-mm-ss')

    this.cvMenit = 1000 * 60
    this.cvJam = this.cvMenit * 60
    this.cvHari = this.cvJam * 24
    this.waktuGantiFileMs =


      setInterval(() => {
        this.namaFile = this.time.format('HH-mm-ss')
      },)
  }
  // Mengecek folder ada atau tidak
  // checkFolder(dirPath) {
  //   try {
  //     // Query the entry
  //     var stats = fs.lstatSync(dirPath);
  //     // Is it a directory?
  //     if (stats.isDirectory()) return true
  //   } catch (e) {
  //     return false
  //   }
  // }

  listDir(lok = "", mode = "all") {
    let listnya;
    mode = mode.toLowerCase();
    try {
      listnya = fs.readdirSync(lok, { withFileTypes: true }).filter(dirent => mode === "file" ? dirent.isFile() : mode === "folder" ? dirent.isDirectory() : dirent).map(dirent => dirent.name)
    } catch (e) {
      listnya = []
    }
    return listnya
  }

  infoFile(jenis) {
    // let typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama, time, tanggal, waktu, lokasiFolder, listFile, namaFile
    let typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama
    let namaFile = ""
    let time = moment().tz('Asia/Jakarta')
    let tanggal = time.format('DD-MM-YYYY')
    let waktu = time.format('HH-mm-ss')
    let lokasiFolder = this.base_dir + tanggal

    let listFile = this.listDir(lokasiFolder, 'file')
    namaFile = `${waktu}`

    // Menentukan File baru atau memakai file lama
    if (listFile.length > 0) {
      let typeWaktu = this.waktuGantiFile.toLocaleLowerCase().split(' ')
      let namaFileLama = listFile[listFile.length - 1]
      let lokasiFileLama = `${lokasiFolder}${namaFileLama}`

      let waktuLama = namaFileLama.split('-' + jenis)[0]

      let jam = waktu.split('-')[0]
      let jamLama = waktuLama.split('-')[0]

      let menit = waktu.split('-')[1]
      let menitLama = waktuLama.split('-')[1]

      if (typeWaktu[1] == 'menit') {
        if (jam == jamLama) {
          // Jika File kurang dari type waktu yang telah ditentukan, Maka masih memakai File lama
          if ((menit - menitLama) <= typeWaktu[0] > 5 ? typeWaktu[0] : 30) {
            namaFile = `${waktuLama}`
          }
        }
      } else if (typeWaktu[1] == 'jam') {
        // Jika sudah melewati jam yang telah ditentukan, maka akan membuat file baru
        if ((jam - jamLama) < typeWaktu[0]) {
          namaFile = `${waktuLama}`
        }
      }
    }
    return {
      typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit,
      menitLama, time, tanggal, waktu, lokasiFolder, listFile, namaFile
    }
  }

  cekUmurFile(lokFile, jenis = "ubah") {
    this.time = moment()
    let infoFile = fs.lstatSync(lokFile)
    let dapat = jenis == 'ubah' ? infoFile.mtime : infoFile.birthtime

    let menit = this.time.diff(dapat, 'minute')
    let jam = this.time.diff(dapat, 'hours')
    let hari = this.time.diff(dapat, 'days')
    return {
      menit, jam, hari
    }
  }

  changeTimeZone(waktu = moment(), format = 'HH-mm-ss') {
    return waktu.tz('Asia/Jakarta').format(format)
  }

  namaFileLog(lokFile) {
    let listFile = this.listDir(lokasiFolder, 'file')
    let waktu = this.changeTimeZone(this.time)

    let umurFile = this.cekUmurFile(lokFile)

    let fileMenit = this.waktuGantiFile.indexOf('menit')
    let fileJam = this.waktuGantiFile.indexOf('hours')
    let fileHari = this.waktuGantiFile.indexOf('days')

    // Jika umur file lebih dari waktu ganti file nya.
    if (umurFile[this.typeWaktuGantiFile[1] > this.typeWaktuGantiFile[0]]) {
      this.namaFile = this.time.tz('Asia/Jakarta').format('HH-mm-ss')
    } else {
      this.namaFile = waktu
    }
  }

  logger(jenis = "BotWa", level = 'info') {
    let { waktu, namaFile, time, lokasiFolder, typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama, tanggal, listFile } = this.infoFile(jenis)
    let datePattern = 'YYYY-MM-DD',
      maxSize = "5m",
      maxFile = "30d",
      dirname = `${this.base_dir}${time.format('DD-MM-YYYY')}/`,
      date = time.format(datePattern)

    namaFile = `${namaFile}-${jenis}`
    console.log(namaFile, time, waktu)
    process.env.fileLog = dirname + `${namaFile}-${jenis}-${date}.log`
    return winston.createLogger({
      level: level,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          colorize: true
        }),
        new DailyRotate({
          dirname: dirname,
          filename: `${namaFile}-%DATE%.log`,
          datePattern: datePattern,
          zippedArchive: true,
          maxSize: maxSize,
          maxFile: maxFile
        }),
        new DailyRotate({
          handleExceptions: true,
          handleRejections: true,
          level: 'error',
          dirname: `${dirname}error/`,
          filename: `${namaFile}-%DATE%.log`,
          datePattern: datePattern,
          zippedArchive: true,
          maxSize: maxSize,
          maxFile: maxFile
        }),
      ],
      format: winston.format.printf(log => {
        let levelLog = log.level.toUpperCase()
        return `${waktu} | ${log.exception ? 'Exception' : levelLog}\n${log.message}\n`
      })
    })
  }

  info(data) {
    this.logger().info(data)
  }
  warn(data) {
    this.logger().warn(data)
  }
  error(data) {
    this.logger().error(data)
  }
  http(data) {
    this.logger().http(data)
  }
  verbose(data) {
    this.logger().verbose(data)
  }
  debug(data) {
    this.logger().debug(data)
  }
  silly(data) {
    this.logger().silly(data)
  }
}

module.exports = log