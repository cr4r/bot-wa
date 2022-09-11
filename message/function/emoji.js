const convertEmoji = require('universal-emoji-parser')
const textToImage = require('text2png')

exports.emoji = async (rahman, message, { args, perintah, configStiker }) => {
  const { txtPng } = configStiker
  const { id, from, body, caption } = message
  const commands = caption || body || ''
  const command = commands.toLowerCase().split(' ')[0] || ''
  let optionImg = ['foto', 'gambar', 'img'];
  let optionTxt = ['txt', 'text'];
  args = args.join(' ')


  try {
    let url = convertEmoji.parse(args).split('src="')[1].replace(/"\/\>/g, '')

    if (perintah.length > 1 && optionImg.includes(perintah[1])) {
      rahman.sendFileFromUrl(from, url, 'Emoji-CodersFamily.jpg', '', null, 'by: Coders Family', true)
        .catch(async (err) => {
          console.error('Error saat mengirim foto emoji\n==========================\n', err)
          await rahman.reply(from, 'Gagal mengirim foto emoji', id)
        })
    } else {
      stiker.img.removebg = true;
      rahman.sendStickerfromUrl(from, url, null, stiker.img)
        .catch(async (err) => {
          console.error('Error saat mengirim stiker emoji\n==========================\n', err)
          await rahman.reply(from, 'Gagal mengirim stiker emoji!', id)
        })
    }
  } catch (e) {
    if (perintah.length > 1 && optionTxt.includes(perintah[1])) {
      let cnvrtPng = textToImage(args, txtPng);
      let baseEn = `data:image/png;base64,${cnvrtPng.toString('base64')}`
      return rahman.sendFile(from, baseEn, 'hehe.png', '', id)
    }
    rahman.reply(from, 'Emoji tidak didukung!', id)
  }

}