const convertEmoji = require('universal-emoji-parser')
const txtPng = require('text2png')
const configStiker = require('../../config').stiker
const configTxtPng = require('../../config').txtPng


exports.emoji = async (rahman, message, { args }) => {
  const { id, from, body, caption } = message
  const commands = caption || body || ''
  const command = commands.toLowerCase().split(' ')[0] || ''

  const perintah = command.split(':')

  let optionImg = ['foto', 'gambar', 'img'];
  let optionTxt = ['txt', 'text'];


  try {
    let url = convertEmoji.parse(args).split('src="')[1].replace(/"\/\>/g, '')
    if (perintah.length > 1 && optionImg.includes(perintah[1])) {
      rahman.sendFileFromUrl(from, url, 'Emoji-CodersFamily.jpg', '', null, 'by: Coders Family', true)
        .catch(async (err) => {
          console.error('Error saat mengirim foto emoji\n==========================\n', err)
          await rahman.reply(from, 'Gagal mengirim foto emoji', id)
        })
    } else if (perintah.length > 1 && optionTxt.includes(perintah[1])) {
      let cnvrtPng = txtPng(args, configTxtPng);
      let baseEn = `data:image/png;base64,${cnvrtPng.toString('base64')}`
      rahman.sendFile(from, baseEn, 'hehe.png', '', id)

    } else {
      configStiker.img.removebg = true;
      rahman.sendStickerfromUrl(from, url, null, configStiker)
        .catch(async (err) => {
          console.error('Error saat mengirim stiker emoji\n==========================\n', err)
          await rahman.reply(from, 'Gagal mengirim stiker emoji!', id)
        })
    }
  } catch (e) {
    rahman.reply(from, 'Emoji tidak didukung!', id)
  }

}