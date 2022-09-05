const { decryptMedia } = require('@open-wa/wa-decrypt')
const { fail } = require("../text/lang/ind.js")

const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)

const configStiker = require('../../config').stiker


exports.stiker = async (rahman, message) => {
  const { type, id, from, isMedia, mimetype, quotedMsg, body, caption } = message
  const commands = caption || body || ''
  const args = commands.split(' ')

  // Jika mengirim gambar langsung text
  if (isMedia) {
    const mediaData = await decryptMedia(message, uaOverride);
    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;

    const jenis = mimetype.split('/')

    if (type == "image") {
      await rahman.sendImageAsSticker(from, imageBase64, configStiker.img).catch(err => rahman.reply(from, fail, id))
    } else if (type == "video") {
      if ((jenis[0] == 'video' || jenis[1] == 'gif') && message.duration < 30) {
        rahman.reply(from, 'Tunggu sebentar, proses konvert video ke stiker', id)
        await rahman.sendMp4AsSticker(from, imageBase64, null, configStiker.video).catch(err => rahman.reply(from, fail, id))
      }
    }
  }
  // Jika mengirim gambar dengan tag gambar
  else if (quotedMsg) {
    const mediaData = await decryptMedia(quotedMsg, uaOverride);
    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;

    const jenis = quotedMsg.mimetype.split('/')

    if (jenis[0] == 'image') {
      await rahman.sendImageAsSticker(from, imageBase64, configStiker.img).catch(err => rahman.reply(from, fail, id))
    } else if (jenis[0] == 'video' || jenis[1] == 'gif') {
      if (quotedMsg.duration < 30) {
        rahman.reply(from, 'Tunggu sebentar, proses konvert video ke stiker', id)
        await rahman.sendMp4AsSticker(from, imageBase64, null, configStiker.video).catch(err => rahman.reply(from, fail, id))
      }
    }
  }
  // Jika membuat stiker dengan url (Belum Di coba)
  else if (args.length === 2) {
    const url = args[1];
    if (url.match(isUrl)) {
      await rahman.sendStickerfromUrl(from, url, { method: 'get' }).catch(err => rahman.reply(from, fail, id))
    } else {
      rahman.reply(from, "Hanya bisa membuat stiker lewat tag atau url", id)
    }
  } else {
    rahman.reply(from, 'Pembuatan stiker hanya dari gambar, video atau gif saja', id)
  }
}