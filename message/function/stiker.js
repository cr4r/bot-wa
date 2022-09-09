const { decryptMedia } = require('@open-wa/wa-decrypt')
const { fail } = require("../text/lang/ind.js")

const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)

const configStiker = require('../../config').stiker

const txtPng = require('text2png')
const configTxtPng = require('../../config').txtPng

exports.stiker = async (rahman, message, { args }) => {
  const { type, id, from, isMedia, mimetype, quotedMsg, body, caption } = message
  const commands = caption || body || ''

  // Jika mengirim gambar langsung text
  // console.log(message)

  if (isMedia) {
    const mediaData = await decryptMedia(message, uaOverride);
    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;

    const jenis = mimetype.split('/')
    if (type == "image") {
      if (args.length === 2 && args[1] == 'nobg') configStiker.img.removebg = true;
      rahman.sendImageAsSticker(from, imageBase64, configStiker.img).catch(err => rahman.reply(from, fail, id))
    } else if (type == "video") {
      if ((jenis[0] == 'video' || jenis[1] == 'gif') && message.duration < 30) {
        rahman.reply(from, 'Tunggu sebentar, proses konvert video ke stiker', id)
        rahman.sendMp4AsSticker(from, imageBase64, null, configStiker.video).catch(err => rahman.reply(from, fail, id))
      }
    }
  }
  // Jika mengirim gambar dengan tag gambar
  else if (quotedMsg && quotedMsg.type != 'chat') {
    const mediaData = await decryptMedia(quotedMsg, uaOverride);
    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;

    if (quotedMsg.type == 'sticker') {
      try {
        const mediaData = await decryptMedia(quotedMsg, uaOverride)
        const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`
        await rahman.sendFile(from, imageBase64, 'sticker.jpg', '', id)
      } catch (e) {
        await rahman.reply(from, 'Error!', id)
      }
    } else {
      const jenis = quotedMsg.mimetype.split('/')
      if (jenis[0] == 'image') {
        if (args.length === 2 && args.includes('nobg')) configStiker.img.removebg = true;
        await rahman.sendImageAsSticker(from, imageBase64, configStiker.img).catch(err => rahman.reply(from, fail, id))
      } else if (jenis[0] == 'video' || jenis[1] == 'gif') {
        if (quotedMsg.duration < 30) {
          rahman.reply(from, 'Tunggu sebentar, proses konvert video ke stiker', id)
          await rahman.sendMp4AsSticker(from, imageBase64, null, configStiker.video).catch(err => rahman.reply(from, fail, id))
        }
      }
    }
  }
  // Jika membuat stiker dengan args (Belum Di coba)
  else if (commands.split(' ').length > 1) {
    if (args.match(isUrl)) {
      await rahman.sendStickerfromUrl(from, args, { method: 'get' }).catch(err => rahman.reply(from, fail, id))
    } else {
      const cnvrtPng = txtPng(args, configTxtPng);
      let imageBase64 = `data:image/png;base64,${cnvrtPng.toString('base64')}`
      rahman.sendImageAsSticker(from, imageBase64, configStiker.img).catch(err => rahman.reply(from, fail, id))
      // rahman.reply(from, "Hanya bisa membuat stiker lewat tag atau args", id)
    }
  } else {
    rahman.reply(from, 'Pembuatan stiker hanya dari gambar, video atau gif saja', id)
  }
}