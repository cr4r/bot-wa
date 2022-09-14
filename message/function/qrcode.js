exports.qrcode = (rahman, message, { ar, ind }) => {
  const { from, id } = message
  rahman.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${ar.join(' ')}`, `${ar.join(' ')}`, `isi: ${ar.join(' ')}`)
    .catch(err => rahman.reply(from, ind.fail, id));
}