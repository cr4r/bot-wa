const { stiker, emoji, register, level, shortlink, dadu, qrcode } = require('./function');

module.exports = {
  "langsung": {
    "register": {
      nama: ["regis", "register", "daftar", "registrasi"],
      register
    },
    "level": {
      nama: ["level", "lvl", "leveling"],
      level
    }
  },
  "perintah": {
    "stiker": {
      nama: ["stiker", "sticker"],
      stiker
    },
    "emoji": {
      nama: ["emoji", "emogi", "emot"],
      emoji
    },
    "shortlink": {
      nama: ["shortlink"],
      shortlink
    },
    "dadu": {
      nama: ["dadu"],
      dadu
    },
    "qrcode": {
      nama: ["qrcode", 'qr', 'qrc'],
      qrcode
    }
  }
}