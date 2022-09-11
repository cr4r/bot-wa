exports.register = async (rahman, message, { args, _registered, time }) => {
  const { isGroupMsg } = message;

  let q = args.split(':');

  args = args.join(' ')

  if (isRegistered) return await rahman.reply(from, ind.registeredAlready(), id)
  if (isGroupMsg) return await rahman.reply(from, ind.pcOnly(), id)
  if (!args.includes(':') || q.length != 2) return await rahman.reply(from, ind.wrongFormat(), id)

  const namaUser = q[0].trim()
  const umurUser = q[1].trim()

  const serialUser = createSerial(20)
  if (Number(umurUser) >= 50) return await rahman.reply(from, ind.ageOld(), id)
  register.addRegisteredUser(sender.id, namaUser, umurUser, time, serialUser, _registered)
  await rahman.reply(from, ind.registered(namaUser, umurUser, sender.id, time, serialUser), id)
  console.log(color('[REGISTER]'), color(time, 'yellow'), 'Name:', color(namaUser, 'cyan'), 'Age:', color(umurUser, 'cyan'), 'Serial:', color(serialUser, 'cyan'))
}