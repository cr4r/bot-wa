exports.dadu = (rahman, message, { ind }) => {
  const { from, id } = message
  const dice = Math.floor(Math.random() * 6) + 1;
  console.log(dice, 'https://www.random.org/dice/dice' + dice + '.png')
  rahman.sendStickerfromUrl(from, 'https://www.random.org/dice/dice' + dice + '.png', { method: 'get' }).catch(err => rahman.reply(from, ind.fail, id));
}