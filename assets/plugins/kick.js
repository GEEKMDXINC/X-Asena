const handler = async (message, { client }) => {
  const kickMessage = `✳️ Utilisation correcte de la commande\n*${message.usedPrefix + message.command}* @utilisateur`;

  if (!message.mentionedJid[0] && !message.quoted) {
    return client.sendMessage(message.chat, kickMessage, { mentions: client.parseMention(kickMessage) });
  }

  const user = message.mentionedJid[0] ? message.mentionedJid[0] : message.quoted.sender;
  const group = message.chat.split('-')[0];

  await client.groupRemove(message.chat, [user]);
  client.sendMessage(message.chat, '✅ Utilisateur expulsé');
};

handler.help = ['kick @utilisateur'];
handler.tags = ['group'];
handler.command = ['kick', 'expulsar'];
handler.admin = true;
handler.group = true;
handler.botAdmin = true;

module.exports = handler;