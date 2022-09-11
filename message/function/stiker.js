const textToImage = require('text2png')

exports.stiker = async (rahman, message, { args, perintah, mediaEncrypt, isQuotedSticker, configStiker, uaOverride, isUrl, ind, decryptMedia }) => {
  const { txtPng } = configStiker
  const { id, from } = message
  const { type, mimetype } = mediaEncrypt

  let cnvrt = ['link', 'url']
  let pTxtPNG = ['tf', 'transparan', 'transparent', 'nobg']

  if (perintah.length > 1 && pTxtPNG.includes(perintah[1])) {
    txtPng.backgroundColor = 'transparent'
    stiker.img.removebg = true
  }

  // Jika mengirim gambar langsung text
  try {
    const mediaData = type != 'chat' ? await decryptMedia(mediaEncrypt, uaOverride) : args.join(' ');

    if (type != 'chat') {
      const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`;
      const jenis = mediaEncrypt.mimetype.split('/')

      // Convert gambar ke stiker | (kirim gambar) ketik .stiker
      if (type == "image") {
        rahman.sendImageAsSticker(from, imageBase64, stiker.img).catch(err => rahman.reply(from, ind.fail, id))
      }
      // Convert video ke stiker bergerak | (Kirim video / Gif) ketik .stiker
      else if (type == "video" || jenis[1] == 'gif') {
        // Video dibatasi 30 detik
        if (mediaEncrypt.duration <= 30) {
          rahman.reply(from, 'Tunggu sebentar, proses konvert video ke stiker', id)
          rahman.sendMp4AsSticker(from, imageBase64, null, stiker.video).catch(err => rahman.reply(from, ind.fail, id))
        } else {
          rahman.reply(from, 'Batas durasi Video hanya bisa 30 detik', id);
        }
      }
      // Convert stiker ke gambar | .stiker (tag gambar)
      else if (isQuotedSticker) {
        rahman.sendFile(from, imageBase64, 'sticker.jpg', '', id)
      } else {
        rahman.reply(from, 'Perintah stiker salah!', id)
      }
    }
    else if (type == 'chat') {
      // Convert text to stiker | .stiker:img text anda 
      if (perintah.length > 1 && cnvrt.includes(perintah[1]) && mediaData.match(isUrl)) {
        rahman.sendStickerfromUrl(from, mediaData, { method: 'get' }).catch(err => rahman.reply(from, ind.fail, id))
      }
      // link gambar to stiker | .stiker https://.....jpg
      else if (args.length > 0) {
        let hasil = await textToImage(mediaData, txtPng)
        rahman.sendImageAsSticker(from, hasil, stiker.img).catch(err => rahman.reply(from, ind.fail, id))
      } else {
        rahman.reply(from, 'Perintah stiker salah!', id)
      }
    } else {
      rahman.reply(from, 'Pembuatan stiker hanya dari gambar, video atau gif saja', id)
    }
  } catch (e) {
    console.log(e)
    rahman.reply(from, 'Bot Error! Lakukan perintah dengan benar', id)
  }
}