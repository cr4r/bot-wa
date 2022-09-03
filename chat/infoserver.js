exports.infoserver = async (rahman, message) => {
  const { id, from } = message

  let { OS, RAM_INFO, chats, messages, contacts, } = rahman._sessionInfo;
  let pesan = `OS yang digunakan\n${OS}
${pemisah}
  Info RAM\n${RAM_INFO}
${pemisah}
  Chat belum dibuka\n${chats}
${pemisah}
  Total Chat\n${messages} chat
${pemisah}
  Total kontak terhubung dengan bot\n${contacts} nomor
${pemisah}
Pemilik server: CR4R`

  rahman.reply(from, pesan, id)
}