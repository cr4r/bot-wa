const fs = require('fs');

let cwd = __dirname + '/../'
let lokVar = cwd + 'variabel/'
let pemisah = "====================="

exports.changeJSON = async (text, file, mode = 'ubah') => {
  if (text && file) {
    let ltkFile = cwd + file
    console.log(ltkFile)
    let files = require(ltkFile);
    console.log(files)
    await Object.keys(text).forEach((isi) => {
      if (mode === 'ubah') {
        console.log('disini', text)
        files[isi] = text[isi]
        console.log('aaa',files)
      } else {
        delete files[isi]
      }
    });
    console.log('sedang anu');
    await fs.writeFileSync(ltkFile, JSON.stringify(files));
    return true;
  }

  return false;
}

exports.msgs = (command) => {
  let pesan;
  if (command) {
    if (command.startsWith('')) {
      if (command.length >= 10) {
        pesan = `${command.substr(0, 15)}`;
      } else {
        pesan = `${command}`
      }
    }
  } else {
    pesan = 'msgs(command)';
  }
  return pesan
}

exports.cekBlokir = async (rahman, sender) => {
  let hasil = false;
  if (rahman && sender) {
    let pengirim = sender.id.replace(/\@c\.us/g, '');
    let nomor = require(lokVar + 'nomor.json');

    let blockWa = await rahman.getBlockedIds() || [];
    let blockOnFile = nomor.blokir || [];

    let dfB = [...blockWa, ...blockOnFile].map(function (v) { return v.replace(/\@c\.us/g, ''); })

    hasil = nomor.owner === pengirim ? false : dfB.includes(pengirim)

    return hasil
  }
}