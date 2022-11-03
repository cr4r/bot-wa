const express = require('express')
const router = express.Router()

router.get('/', (req, res, next) => {
  res.render(`${__dirname}/../views/root.ejs`);
  
});

module.exports = router