const winston = require('winston')
const moment = require('moment-timezone')
const fs = require('fs-extra')
const path = require('path')
const DailyRotate = require('winston-daily-rotate-file')
const { access } = require('fs/promises')

class log {
  intervalNamaFile
  base_dir = `${process.env.base_log}LogHarian/`
  time = moment().tz('Asia/Jakarta')
  maxSize = "5m"
  datePattern = 'YYYY-MM-DD'

  constructor() {
    this.cvMenit = 1000 * 60
    this.cvJam = this.cvMenit * 60
    this.cvHari = this.cvJam * 24
  }

  init(isi = {}) {
    const { waktuGantiFile, jenisLog, formatFile } = isi

    // Menit, Jam, Hari
    this.typeWaktuGF = waktuGantiFile ? waktuGantiFile.toLowerCase().split(' ') : '30 menit'.split(' ')

    this.time = moment().tz('Asia/Jakarta')
    this.jenisLog = jenisLog ? jenisLog : 'BotWa'
    this.dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`
    this.namaFile = `${this.time.format('HH-mm-ss')}-%DATE%`
    // Awal log jika ada log sebelumnya blum penuh, maka akan pakai file sebelumnya
    let listFile = this.listDir(`${this.dirname}${this.jenisLog}/`, 'file')
    if (listFile.length > 0) {
      let namaFileLama = listFile[listFile.length - 1]
      let umurFileLama = this.cekUmurFile(`${this.dirname}${this.jenisLog}/${namaFileLama}`)
      let sizeFileLama = umurFileLama.size
      let sizeFileC = this.maxSize.split('')
      let jenisUmurFileLama = umurFileLama[this.typeWaktuGF[1]]
      let interval = parseInt(this.typeWaktuGF[0])

      // Jika umur file (20 menit) kurang dari interval (30 menit )
      // Dan ukuran file lama tidak lebih dari file yang telah ditentukan
      if (jenisUmurFileLama < interval && sizeFileLama[sizeFileC[1]] < sizeFileC[0]) {
        // Maka akan memakai file lama
        this.namaFile = path.parse(namaFileLama).name.replace('-' + this.time.format(this.datePattern), '-%DATE%')
      }
    }
    this.IntervalFile(this.typeWaktuGF.join(' '))
  }

  IntervalFile(waktu = '30 menit') {
    clearInterval(this.intervalNamaFile)

    let typeWaktu = waktu.toLowerCase().split(' ')

    // Conversi waktu ke MS
    if (typeWaktu[1] == 'menit') {
      this.waktuGantiFileMs = this.cvMenit * typeWaktu[0]
    } else if (typeWaktu[1] == 'jam') {
      this.waktuGantiFileMs = this.cvJam * typeWaktu[0]
    } else {
      this.waktuGantiFileMs = this.cvHari * typeWaktu[0]
    }
    this.intervalNamaFile = setInterval(() => {
      this.time = moment().tz('Asia/Jakarta')
      // 12-40-50-Bot-Wa-%DATE%
      this.namaFile = `${this.time.format('HH-mm-ss')}-%DATE%`
      this.dirname = `${this.base_dir}${this.time.format('DD-MM-YYYY')}/`
    }, this.waktuGantiFileMs)
  }

  // Mengecek folder ada atau tidak
  isFolder(dirPath) {
    try {
      // Query the entry
      var stats = fs.lstatSync(dirPath);
      // Is it a directory?
      if (stats.isDirectory()) return true
    } catch (e) {
      return false
    }
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

  konvertSize(size) {
    let k = size * 0.001
    let m = k * 0.001
    let g = m * 0.001
    return { k, m, g }
  }

  cekUmurFile(lokFile, jenis = "ubah") {
    this.time = moment()
    let infoFile = fs.lstatSync(lokFile)
    let dapat = jenis == 'ubah' ? infoFile.mtime : infoFile.birthtime

    let menit = this.time.diff(dapat, 'minute')
    let jam = this.time.diff(dapat, 'hours')
    let hari = this.time.diff(dapat, 'days')
    return {
      infoFile, size: this.konvertSize(infoFile.size), menit, jam, hari
    }
  }

  changeTimeZone(waktu = moment(), format = 'HH-mm-ss') {
    return waktu.tz('Asia/Jakarta').format(format)
  }


  logger(param = {}) {
    var { level, formatLog } = param

    level = level ? level : 'info'
    formatLog = formatLog ? formatLog : 'json'
    this.formatFile = formatLog == 'json' ? '.json' : '.log'

    this.time = moment().tz('Asia/Jakarta')
    let formatLogging,
      maxSize = this.maxSize,
      maxFile = "30d",
      date = this.changeTimeZone(moment(), this.datePattern);

    process.env.fileLog = this.dirname + this.jenisLog + '/' + this.namaFile.replace('%DATE%', date) + this.formatFile

    // Format didalam file
    if (formatLog == "json") {
      formatLogging = winston.format.combine(
        winston.format.timestamp({
          format: moment().tz('Asia/Jakarta').format('YYYY-MM-DD HH:mm:ss')
        }),
        winston.format.json()
      )
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
          json: false,
          timestamp: true,
          colorize: true
        }),
        new DailyRotate({
          dirname: `${this.dirname}${this.jenisLog}/`,
          filename: this.namaFile + this.formatFile,
          datePattern: this.datePattern,
          timestamp: moment().tz('Asia/Jakarta'),
          formatter(params) {
            // Options object will be passed to the format function.
            // It's general properties are: timestamp, level, message, meta.
            const meta = params.meta !== undefined ? util.inspect(params.meta, { depth: null }) : '';
            return `[${params.timestamp}] [${params.level}] [${pkg.name}] *** ${params.message} ${meta}`;
          },
          zippedArchive: true, maxSize, maxFile
        }),
        new DailyRotate({
          handleExceptions: true,
          handleRejections: true,
          level: 'error',
          dirname: `${this.dirname}${this.jenisLog}/error/`,
          filename: this.namaFile + this.formatFile,
          datePattern: this.datePattern,
          zippedArchive: true, maxSize, maxFile
        }),
      ],
      format: formatLogging
    })
  }

  convertFileToJSON(lokasi, jenis = 'json') {
    let aaa,
      filenya = fs.readFileSync(lokasi, 'utf-8').trim().split('}\n'),
      hasil = filenya.map(a => {
        try {
          eval('aaa=' + a + '}');
        } catch (e) {
          eval('aaa=' + a);
        }
        return aaa
      })
    if (jenis == 'json') return hasil
    return JSON.stringify(hasil)
  }

  info(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).info(data)
  }
  warn(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).warn(data)
  }
  error(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).error(data)
  }
  http(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).http(data)
  }
  verbose(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).verbose(data)
  }
  debug(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).debug(data)
  }
  silly(isi) {
    if (typeof isi == 'string') {
      let data
      data = isi
    } else {
      let { data, jenisLog, formatLog } = isi
    }
    this.logger(isi).silly(data)
  }
}

module.exports = log