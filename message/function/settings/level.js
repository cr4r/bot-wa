exports.level = async (rahman, message, { pushname, ar, isLevelingOn, level, groupId, _level, ind, Math, canvas, limit, _limit, limitCount, _leveling, isPremium, isOwner, fs, isUrl }) => {

  const { from, id, sender, isGroupMsg } = message

  const rank = async ({ _level, pengirim, pushname }) => {
    const userLevel = level.getLevelingLevel(pengirim, _level)
    const userXp = level.getLevelingXp(pengirim, _level)
    const ppLink = await rahman.getProfilePicFromServer(pengirim)

    const pepe = isUrl(ppLink) ? ppLink : '../../../temp/gambar/pp-wa.jpg'
    const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100


    const rnk = new canvas.Rank()
      .setAvatar(pepe)
      .setLevel(userLevel)
      .setLevelColor('#ffa200', '#ffa200')
      .setRank(Number(level.getUserRank(pengirim, _level)))
      .setCurrentXP(userXp)
      .setOverlay('#000000', 100, false)
      .setRequiredXP(requiredXp)
      .setProgressBar('#ffa200', 'COLOR')
      .setBackground('COLOR', '#000000')
      .setUsername(pushname)
      .setDiscriminator(pengirim.substring(6, 10))
    console.log(message, _level, pengirim, pushname)
    console.log("pwd: " + __dirname)
    console.log("pepe: " + pepe)
    console.log("userLevel: " + userLevel)
    console.log("userXp: " + userXp)
    console.log("ppLink: " + ppLink)
    console.log("rnk: " + JSON.stringify(rnk))
    console.log('===============================')

    return rnk
  }

  let argOn = ['hidup', 'on', 'enable', 'nyala', 'menyala']
  let argOff = ['mati', 'off', 'disable', 'matikan']
  let allMember = ['member', 'all', 'semua']

  if (argOn.includes(ar[0])) {
    if (isLevelingOn) return await rahman.reply(from, ind.levelingOnAlready(), id)
    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await rahman.reply(from, ind.limit(), id)
    limit.addLimit(sender.id, _limit, isPremium, isOwner)
    _leveling.push(groupId)
    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
    await rahman.reply(from, ind.levelingOn(), id)
  } else if (argOff.includes(ar[0])) {
    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await rahman.reply(from, ind.limit(), id)
    limit.addLimit(sender.id, _limit, isPremium, isOwner)
    _leveling.splice(groupId, 1)
    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
    await rahman.reply(from, ind.levelingOff(), id)
  } else if (allMember.includes(ar[0])) {
    if (!isLevelingOn) return await rahman.reply(from, ind.levelingNotOn(), id)
    const allMember = await rahman.getGroupMembers(groupId);
    allMember.forEach(async (isi) => {
      if (isi.isMe) return
      pengirim = isi.id
      pushname = isi.pushname

      let hasil = await rank({ _level, pengirim, pushname })
      await hasil.build()
        .then(async (buffer) => {
          const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
          await rahman.sendImage(from, imageBase64, 'rank.png', '')
        })
        .catch(async (err) => {
          console.error(err)
          await rahman.reply(from, 'Error!', id)
        })
    })
  } else {
    if (!isLevelingOn) return await rahman.reply(from, ind.levelingNotOn(), id)
    if (!isGroupMsg) return await rahman.reply(from, ind.groupOnly(), id)

    const hasil = await rank({ _level, pengirim: sender.id, pushname })
    hasil.build()
      .then(async (buffer) => {
        const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
        await rahman.sendImage(from, imageBase64, 'rank.png', '', id)
      })
      .catch(async (err) => {
        console.error(err)
        await rahman.reply(from, 'Error!', id)
      })

  }
}