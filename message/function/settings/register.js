exports.register = async (rahman, message, { perintah, q, _registered, time, ind, isRegistered, register, color }) => {
  const { isGroupMsg, from, id, sender } = message;

  if (isRegistered) return await rahman.reply(from, ind.registeredAlready(), id)
  if (isGroupMsg) return await rahman.reply(from, ind.pcOnly(), id)
  if (!q.includes(':') || perintah.length != 2) return await rahman.reply(from, ind.wrongFormat(), id)

  const namaUser = perintah[0].trim()
  const umurUser = perintah[1].trim()

  const serialUser = createSerial(20)
  if (Number(umurUser) >= 50) return await rahman.reply(from, ind.ageOld(), id)
  register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
  await rahman.reply(from, ind.registered(namaUser, umurUser, sender.id, time, serialUser), id)
  console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
}