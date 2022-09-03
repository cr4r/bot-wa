const { decryptMedia } = require('@open-wa/wa-decrypt')
const { gagal } = require("../variabel/text.json")
const uaOverride = 'WhatsApp/2.2029.4 Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.116 Safari/537.36';
const isUrl = new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/gi)

exports.stiker = async (rahman, message) => {
  const { type, id, from, isMedia, mimetype, quotedMsg, body, caption } = message
  const commands = caption || body || ''
  const args = commands.split(' ')

  configStiker = { author: 'Coders Family', pack: 'CR4R', keepScale: true }

  // if (cekBlokir())
  if (isMedia && type === 'image') {
    const mediaData = await decryptMedia(message, uaOverride);
    const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
    await rahman.sendImageAsSticker(from, imageBase64, configStiker).catch(err => rahman.reply(from, gagal, id))

  } else if (quotedMsg && quotedMsg.type == 'image') {
    const mediaData = await decryptMedia(quotedMsg, uaOverride);
    const imageBase64 = `data:${quotedMsg.mimetype};base64,${mediaData.toString('base64')}`;
    console.log(from, id)
    await rahman.sendImageAsSticker(from, imageBase64, configStiker).catch(err => rahman.reply(from, gagal, id))

  } else if (isMedia && type === 'video') {
    if ((mimetype === 'video/mp4' && message.duration < 30) || (mimetype === 'image/gif' && message.duration < 30)) {
      const mediaData = await decryptMedia(message, uaOverride);
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
      await rahman.sendMp4AsSticker(from, imageBase64, null, {
        stickerMetadata: true,
        author: 'Coders Family',
        pack: 'CR4R',
        fps: 10,
        square: '512',
        loop: 0,
      }).catch(err => rahman.reply(from, gagal, id))
    } else {
      rahman.reply(from, 'Durasi video maksimal hanya 30 detik', id)
    }
  } else if (args.length === 2) {
    const url = args[1];
    if (url.match(isUrl)) {
      await rahman.sendStickerfromUrl(from, url, { method: 'get' }).catch(err => rahman.reply(from, gagal, id))
    } else {
      rahman.reply(from, "Hanya bisa membuat stiker lewat tag atau url", id)
    }
  } else {
    rahman.reply(from, 'Hanya bisa membuat stiker lewat gambar', id)
  };
}