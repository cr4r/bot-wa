process.env.base_log = __dirname + '/LogWeb/'

let logger = require('./log.js')
global.Logger = new logger()

let router = require('./router.js')

console.log('Hasil :', router)