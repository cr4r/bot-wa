const { changeJSON } = require('../lib/function');

exports.coba = async (rahman, message) => {
  const { id, from } = message

  var tes = await changeJSON({ blokir: 'coba' }, 'variabel/nomor.json')

  rahman.reply(from, `${tes}`, id)

}