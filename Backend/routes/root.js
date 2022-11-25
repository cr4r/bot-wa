const express = require('express')
const fs = require('fs')
const router = express.Router()

router.get('/', (req, res, next) => {
  anu = Logger.convertFileToJSON(process.env.fileLog, 'json')
  res.render(`${__dirname}/../views/root.ejs`, { anu });

});

module.exports = router