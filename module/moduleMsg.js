exports.cheerio = require("cheerio");
exports.fs = require('fs-extra')
exports.axios = require('axios')

const moment = require('moment-timezone');
moment.tz.setDefault('Asia/Jakarta').locale('id')

const { spawn, exec } = require('child_process')
const { color, welcome, msgs, cekBlokir, infoServer } = require('../lib/index');

module.exports = {
  moment,
  spawn, exec,
  color, welcome, msgs, cekBlokir, infoServer,
}