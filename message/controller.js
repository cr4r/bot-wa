const { stiker, emoji, register, level } = require('./function');

module.exports = {
  "langsung": {
    "register": {
      nama: ["regis", "daftar", "registrasi"],
      register
    },
    "level":{
      nama:["level", "lvl", "levelup"],
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
  }
}