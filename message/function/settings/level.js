exports.level = async (rahman, message, { isRegistered, isLevelingOn, isGroupMsg, level }) => {
  if (!isRegistered) return await rahman.reply(from, ind.notRegistered(), id)
  if (!isLevelingOn) return await rahman.reply(from, ind.levelingNotOn(), id)
  if (!isGroupMsg) return await rahman.reply(from, ind.groupOnly(), id)
  const userLevel = level.getLevelingLevel(sender.id, _level)
  const userXp = level.getLevelingXp(sender.id, _level)
  const ppLink = await rahman.getProfilePicFromServer(sender.id)
  if (ppLink === undefined) {
    var pepe = errorImg
  } else {
    pepe = ppLink
  }
  const requiredXp = 5 * Math.pow(userLevel, 2) + 50 * userLevel + 100
  const rank = new canvas.Rank()
    .setAvatar(pepe)
    .setLevel(userLevel)
    .setLevelColor('#ffa200', '#ffa200')
    .setRank(Number(level.getUserRank(sender.id, _level)))
    .setCurrentXP(userXp)
    .setOverlay('#000000', 100, false)
    .setRequiredXP(requiredXp)
    .setProgressBar('#ffa200', 'COLOR')
    .setBackground('COLOR', '#000000')
    .setUsername(pushname)
    .setDiscriminator(sender.id.substring(6, 10))
  rank.build()
    .then(async (buffer) => {
      const imageBase64 = `data:image/png;base64,${buffer.toString('base64')}`
      await rahman.sendImage(from, imageBase64, 'rank.png', '', id)
    })
    .catch(async (err) => {
      console.error(err)
      await rahman.reply(from, 'Error!', id)
    })
}