exports.shortlink = async (rahman, message, { _limit, limit, limitCount, isPremium, isOwner, isUrl, url, ind }) => {
  const { id, from, sender } = message

  if (!isUrl(url)) return await rahman.reply(from, ind.wrongFormat(), id)
  if (limit.isLimit(sender.id, _limit, limitCount, isPremium, isOwner)) return await rahman.reply(from, ind.limit(), id)
  limit.addLimit(sender.id, _limit, isPremium, isOwner)
  const urlShort = await misc.shortener(url)
  rahman.reply(from, urlShort, id)
}