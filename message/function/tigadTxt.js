exports.tigadTxt = (rahman, message, { arg, ind }) => {
  const { from, id } = message
  rahman.sendFileFromUrl(from, `https://docs-jojo.herokuapp.com/api/text3d?text=${arg}`, `${arg}.jpg`, '', id).catch(err => rahman.reply(from, ind.fail, id));
}