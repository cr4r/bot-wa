let log = require('./LogWeb/logs.js')
let request = require('supertest');

process.env.TZ = 'Asia/Jakarta'
process.env.base_botwa = __dirname + '/BotWa/'
process.env.base_log = __dirname + '/LogWeb/'

const Logger = new log()

global.Log = Logger.logger()
global.statusServer = 'Server berjalan'
global.statusError = ''

const app = require('./Backend/app.js')

const port = process.env.PORT || 1906 || 5000 || 3000

request(app)

app.listen(port, () => { console.log('Server telah dimulai => ' + port) })