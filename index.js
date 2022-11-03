process.env.TZ = 'Asia/Jakarta'
const app = require('./Backend/app.js')

const port = process.env.PORT || 1906 || 5000 || 3000

app.listen(port, () => { console.log('Server telah dimulai => ' + port) })