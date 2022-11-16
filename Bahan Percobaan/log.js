const winston = require('winston')
const moment = require('moment-timezone')
const fs = require('fs-extra')
const DailyRotate = require('winston-daily-rotate-file')

class log {
  base_dir = `${process.env.base_log}LogHarian/`
  time = moment().tz('Asia/Jakarta')
  dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`

  constructor(isi = {}) {
    const { waktuGantiFile, jenisLog, formatLog } = isi

    // Menit, Jam, Hari
    this.typeWaktuGF = waktuGantiFile ? waktuGantiFile.toLowerCase().split(' ') : '30 menit'.split(' ')

    this.time = moment().tz('Asia/Jakarta')
    this.formatLog = formatLog ? formatLog : '.log'
    this.jenisLog = jenisLog ? jenisLog : 'BotWa'
    this.namaFile = `${this.time.format('HH-mm-ss')}-${this.jenisLog}`

    this.cvMenit = 1000 * 60
    this.cvJam = this.cvMenit * 60
    this.cvHari = this.cvJam * 24


    if (this.typeWaktuGF[1] == 'menit') {
      this.waktuGantiFileMs = this.cvMenit * this.typeWaktuGF[0]
    } else if (this.typeWaktuGF[1] == 'jam') {
      this.waktuGantiFileMs = this.cvJam * this.typeWaktuGF[0]
    } else {
      this.waktuGantiFileMs = this.cvHari * this.typeWaktuGF[0]
    }

    // Mengganti Nama File secara berulang dalam beberapa menit/jam/hari
    // this.intervalNamaFile = setInterval(() => {
    //   this.namaFile = `${this.time.format('HH-mm-ss')}-${this.jenisLog}`
    //   this.dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`
    // }, this.waktuGantiFileMs)
    this.intervalNamaFile = setInterval(() => {
      this.namaFile = `${this.time.format('HH-mm-ss')}-${this.jenisLog}`
      this.dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`
    }, 2000)
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

  gantiInterval(waktu = '30 menit') {
    clearInterval(this.intervalNamaFile)
    let typeWaktu = waktu.toLowerCase().split(' ')

    if (typeWaktu[1] == 'menit') {
      this.waktuGantiFileMs = this.cvMenit * typeWaktu[0]
    } else if (typeWaktu[1] == 'jam') {
      this.waktuGantiFileMs = this.cvJam * typeWaktu[0]
    } else {
      this.waktuGantiFileMs = this.cvHari * typeWaktu[0]
    }

    this.intervalNamaFile = setInterval(() => {
      this.namaFile = this.time.format('HH-mm-ss')
      this.dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`
    }, this.waktuGantiFileMs)
  }

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

  logger(param = {}) {
    var { jenis, level, formatLog } = param

    jenis = jenis ? jenis : 'BotWa'
    level = level ? level : 'info'
    formatLog = formatLog ? formatLog : 'printf'

    this.time = moment().tz('Asia/Jakarta')
    let formatLogging, datePattern = 'YYYY-MM-DD',
      maxSize = "5m",
      maxFile = "30d",
      date = this.changeTimeZone(moment(), datePattern),
      namaFile = `${this.namaFile}-%DATE%.${this.formatLog}`;

    process.env.fileLog = this.dirname + `${namaFile}-%DATE%.${this.formatLog}`

    // Format didalam file
    if (formatLog == "json") {
      formatLogging = winston.format.json()
    } else if (formatLog == "simple") {
      formatLogging = winston.format.simple()
    } else if (formatLog == "logstash") {
      formatLogging = winston.format.logstash()
    } else {
      formatLogging = winston.format.printf(log => {
        let levelLog = log.level.toUpperCase()
        return `${date} | ${log.exception ? 'Exception' : levelLog}\n${log.message}\n`
      })
    }

    return winston.createLogger({
      level: level,
      transports: [
        new winston.transports.Console({
          level: 'debug',
          colorize: true
        }),
        new DailyRotate({
          dirname: this.dirname,
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
          dirname: `${this.dirname}error/`,
          filename: `${namaFile}-%DATE%.log`,
          datePattern: datePattern,
          zippedArchive: true,
          maxSize: maxSize,
          maxFile: maxFile
        }),
      ],
      format: formatLogging
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