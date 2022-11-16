const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res, next) => {
  // anu = fs.readFileSync(process.env.fileLog, 'utf-8').split('\n').join('<br>')
  res.render(`${__dirname}/../views/root.ejs`, { anu });

});

module.exports = router