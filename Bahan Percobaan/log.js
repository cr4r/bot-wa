const winston = require('winston')
const moment = require('moment-timezone')
const fs = require('fs-extra')
const DailyRotate = require('winston-daily-rotate-file')

class log {
  base_dir = `${process.env.base_log}LogHarian/`
  // logger = winston.createLogger(this.option)
  constructor(isi = {}) {
    const { waktuGantiFile } = isi

    // this.waktuGantiFile = waktuGantiFile ? waktuGantiFile : '30m'

    // TypeFile harus lebih dari 5 menit
    let wgf = waktuGantiFile ? waktuGantiFile.split(' ') : '30 menit'.split(' ')
    this.waktuGantiFile = wgf[0] >= 6 ? `${wgf[0]} ${wgf[1]}` : `30 ${wgf[1]}`
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

  infoFile() {
    let typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama, time, tanggal, waktu, lokasiFolder, listFile, namaFile

    time = moment().tz('Asia/Jakarta')
    tanggal = time.format('DD-MM-YYYY')
    waktu = time.format('HH-mm-ss')
    lokasiFolder = this.base_dir + tanggal

    listFile = this.listDir(lokasiFolder, 'file')
    namaFile = `${waktu}`
    // Menentukan File baru atau memakai file lama
    if (listFile.length > 0) {
      typeWaktu = this.waktuGantiFile.toLocaleLowerCase().split(' ')
      namaFileLama = listFile[listFile.length - 1]
      lokasiFileLama = `${lokasiFolder}${namaFileLama}`

      waktuLama = namaFileLama.split('-BotWa')[0]

      jam = waktu.split('-')[0]
      jamLama = waktuLama.split('-')[0]

      menit = waktu.split('-')[1]
      menitLama = waktuLama.split('-')[1]

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
      typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama, time, tanggal, waktu, lokasiFolder, listFile, namaFile
    }
  }

  logger(level = 'info', jenis = "BotWa") {
    const { waktu, namaFile, time, lokasiFolder, typeWaktu, namaFileLama, lokasiFileLama, waktuLama, jam, jamLama, menit, menitLama, tanggal, listFile } = this.infoFile()
    let datePattern = 'YYYY-MM-DD', maxSize = "5m", maxFile = "30d", dirname = `${this.base_dir}${time.format('DD-MM-YYYY')}/`

    let configDaily = {
      dirname: dirname,
      filename: `${namaFile}-${jenis}-%DATE%.log`,
      datePattern: datePattern,
      zippedArchive: true,
      maxSize: maxSize,
      maxFile: maxFile
    }

    let transDaily = new DailyRotate(configDaily)

    return winston.createLogger({
      level: level,
      transports: [
        transDaily,
        new winston.transports.Console({
          level: 'debug'
        }),
        new DailyRotate({
          handleExceptions: true,
          handleRejections: true,
          level: 'error',
          dirname: `${dirname}error/`,
          filename: `${namaFile}-${jenis}-%DATE%.log`,
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