const axios = require("axios");
const { areJidsSameUser } = require("@shizodevs/shizoweb");

const handler = async (message, { client, args }) => {
  let group = message.chat;
  if (/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(args[0])) group = args[0];
  if (!/^[0-9]{5,16}-?[0-9]+@g\.us$/.test(group)) throw '⚠️ Ne peut être utilisé que dans les groupes';
  const groupMetadata = await client.groupMetadata(group);
  if (!groupMetadata) throw 'groupMetadata est indéfini :\\';
  if (!('participants' in groupMetadata)) throw 'participants n\'est pas défini :(';
  const me = groupMetadata.participants.find(user => areJidsSameUser(user.id, client.user.jid));
  if (!me) throw '✳️ Je ne suis pas dans ce groupe :(';
  if (!me.admin) throw '✳️ Je ne suis pas un administrateur';
  const link = `https://chat.whatsapp.com/${await client.groupInviteCode(group)}`;
  await message.client.sendMessage(message.jid, link);
};

handler.help = ['link'];
handler.tags = ['group'];
handler.command = ['link', 'linkgroup'];

module.exports = handler;