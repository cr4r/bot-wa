exports.level = async (rahman, message, { isRegistered, isLevelingOn, isGroupMsg, level, ind, Math, canvas }) => {
  const { from, id, sender, pushname } = message
  if (!isRegistered) return await rahman.reply(from, ind.notRegistered(), id)
  if (!isGroupMsg) return await rahman.reply(from, ind.groupOnly(), id)
  if (!isGroupAdmins) return await rahman.reply(from, ind.adminOnly(), id)
  if (ar[0] === 'enable') {
    if (isLevelingOn) return await rahman.reply(from, ind.levelingOnAlready(), id)
    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await rahman.reply(from, ind.limit(), id)
    limit.addLimit(sender.id, _limit, isPremium, isOwner)
    _leveling.push(groupId)
    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
    await rahman.reply(from, ind.levelingOn(), id)
  } else if (ar[0] === 'disable') {
    if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await rahman.reply(from, ind.limit(), id)
    limit.addLimit(sender.id, _limit, isPremium, isOwner)
    _leveling.splice(groupId, 1)
    fs.writeFileSync('./database/group/leveling.json', JSON.stringify(_leveling))
    await rahman.reply(from, ind.levelingOff(), id)
  } else {
    await rahman.reply(from, ind.wrongFormat(), id)
  }
}