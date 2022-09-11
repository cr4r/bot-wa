const { stiker, emoji, register, level, shortlink } = require('./function');

module.exports = {
  "langsung": {
    "register": {
      nama: ["regis", "register", "daftar", "registrasi"],
      register
    },
    "level": {
      nama: ["level", "lvl", "levelup"],
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
    }
  }
}