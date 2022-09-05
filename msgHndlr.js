const {
  cheerio,
  fs,
  axios,
  moment,
  color,
  spawn,
  exec,
  msgs,
  cekBlokir,
  infoServer, stiker
} = require('./module/moduleMsg');

// const { stiker } = require('./module/moduleMsg');
// const { ownerNumber } = require('./lib/setting.json')

module.exports = msgHandler = async (rahman, message) => {
  try {
    const { type, id, from, t, sender, isGroupMsg, chat, caption, isMedia, mimetype, quotedMsg, quotedMsgObj, mentionedJidList } = message
    let { body } = message
    const { name, formattedTitle } = chat
    let { pushname, verifiedName } = sender
    pushname = pushname || verifiedName
    const commands = caption || body || ''
    const command = commands.toLowerCase().split(' ')[0] || ''
    const args = commands.split(' ')

    const msgss = await msgs(command);

    function aca(lsls) { return lsls[Math.floor(Math.random() * lsls.length)] }

    let time = moment(t * 1000).format('HH:mm:ss')
    let groupId = isGroupMsg ? chat.groupMetadata.id : ''

    let isBlocked = await cekBlokir(rahman, sender)
    console.log(body, sender)
    const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36'
    if (!isGroupMsg && command.startsWith('')) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mPerintah dari Chat\x1b[1;37m]', time, '\n', color(msgss), 'from', color(pushname))
    if (isGroupMsg && command.startsWith('')) console.log('\x1b[1;31m~\x1b[1;37m>', time, `[\x1b[1;32mPerintah dari Grub: ${color(formattedTitle)}\x1b[1;37m]`, '\n', color(msgss), 'from', color(pushname))
    if (!isGroupMsg && !command.startsWith('')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mChat\x1b[1;37m]', time, '\n', color(body), 'from', color(pushname))
    if (isGroupMsg && !command.startsWith('')) console.log('\x1b[1;33m~\x1b[1;37m>', '[\x1b[1;31mChat Grub\x1b[1;37m]', time, '\n', color(body), 'from', color(pushname), 'in', color(formattedTitle))
    console.log('==========================================')
    function rndm(isi) { return Math.floor(Math.random() * isi) + 1 }


    let fChat = require('./chat/index');
    if (!isBlocked) {
      Object.keys(fChat).forEach(async (isi) => {
        let nChat = fChat[isi];
        if (nChat.nama.includes(command)) {
          await nChat[isi][isi](rahman, message)
        }
      })
    } else {
      rahman.reply(from, 'Anda tidak bisa pakai bot ini karena telah diblokir', id)
    }

  } catch (err) {
    console.log(color('[ERROR]', 'red'), err)
    //rahman.kill().then(a => console.log(a))
  }
}