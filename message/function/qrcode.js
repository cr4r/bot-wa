exports.qrcode = (rahman, message, { ar, ind }) => {
  const { from, id } = message
  rahman.sendFileFromUrl(from, `https://api.qrserver.com/v1/create-qr-code/?size=500x500&data=${ar.join(' ')}`, { method: 'get' }).catch(err => rahman.reply(from, ind.fail, id));
}