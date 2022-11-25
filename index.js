let logger = require('./LogWeb/log.js')
let request = require('supertest');

process.env.TZ = 'Asia/Jakarta'
process.env.base_botwa = __dirname + '/BotWa/'
process.env.base_log = __dirname + '/Backend/public/LogWeb/'

global.Logger = new logger()
Logger.init()

global.statusServer = 'Server berjalan'
global.statusError = ''

const app = require('./Backend/app.js');
// const { Logger } = require('winston');

const port = process.env.PORT || 1906 || 5000 || 3000

// request(app)

app.listen(port, () => {
  cekStatus = `Server telah dimulai: \nlocalhost:${port}\nbot-wa.cr4r19.tech:4000`
  Logger.logger("Server Web").info(cekStatus)
})