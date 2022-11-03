const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const cookieParser = require('cookie-parser')
const compression = require('compression')
const root = require('./routes/root')
const session = require('express-session');
const maxCookie = (24 * 60 * 60 * 1000) * 360 // 360 hari

app.enable('trust proxy');

app.use(compression({
  level: 6,
  threshold: 50 * 1000
}));
app.use(cookieParser())

// JSON
app.use(methodOverride('_method'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ extended: false }))

// Cookie
app.use(session({
  key: 'user_sid',
  resave: false,
  saveUninitialized: false,
  secret: '11b8924611753d44167606f848274defcea0c91ed899b9f6c33f8354e74ded09',
  cookie: {
    maxAge: maxCookie
  }
}));


app.use((req, res, next) => {

  // if (req.protocol === 'https') return res.redirect('http://' + req.hostname + req.url);

  res.header({
    'Access-Control-Allow-Origin': `*`,
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
    'Strict-Transport-Security': 'max-age=15552000; includeSubDomains',
    'X-XSS-Protection': '1;mode=block',
    'X-Content-Type-Options': 'nosniff',
    'X-Permitted-Cross-Domain-Policies': 'none',
    'X-DNS-Prefetch-Control': 'on',
    'X-Frame-Options': 'DENY',
    'Content-Security-Policy': 'frame-ancestors \'none\'',
    'X-Powered-by': 'Coders Family - 2019',
    'Pemberitahuan': 'Ini untuk handle bot whatsapp!',
  });
  // res.set('Cache-Control', 'public, max-age=31557600');
  next()
})

app.set('view engine', 'ejs');

//Managemen Link
app.use("/", express.static(`${__dirname}/public/`));
app.use('/', root)

app.get('*', (req, res) => { res.status(404).json({ status: 'no', result: 'Tidak ada link seperti itu' }) });
app.post('*', (req, res) => { res.status(404).json({ status: 'no', result: 'Tidak ada link seperti itu' }) });
app.put('*', (req, res) => { res.status(404).json({ status: 'no', result: 'Tidak ada link seperti itu' }) });
app.delete('*', (req, res) => { res.status(404).json({ status: 'no', result: 'Tidak ada link seperti itu' }) });


module.exports = app
