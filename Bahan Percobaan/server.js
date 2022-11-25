process.env.base_log = __dirname + '/LogWeb/'

let logger = require('./log.js')
global.Logger = new logger()
Logger.init()

let router = require('./router.js')


setInterval(() => {
  Logger.logger({ formatLog: 'json' }).info('hallsso')
}, 2000)
// console.log('Hasil :', router)