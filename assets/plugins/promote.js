const handler = async (message, { client }) => {
  const promoteMessage = `✳️ Utilisation correcte de la commande\n*${message.usedPrefix + message.command}* @utilisateur (ou répondez à un message)`;

  if (!message.text && !message.quoted) {
    return client.reply(message.chat, promoteMessage, message);
  }

  let user;
  if (isNaN(message.text) && !message.text.match(/@/g)) {
    // No valid number or mention provided
    return;
  } else if (isNaN(message.text)) {
    // Number provided as @tag
    const number = message.text.split`@`[1];
    user = number + '@s.whatsapp.net';
  } else if (!isNaN(message.text)) {
    // Valid number provided
    user = message.text + '@s.whatsapp.net';
  } else if (message.quoted.sender) {
    // Reply to a message
    user = message.quoted.sender;
  } else if (message.mentionedJid) {
    // Mentioned user
    const number = message.text.split`@`[1];
    user = number + '@s.whatsapp.net';
  }

  if (!user) {
    return;
  }

  await client.groupMakeAdmin(message.chat, [user]);
  client.reply(message.chat, '✅ Utilisateur promu', message);
};

handler.help = ['promote'];
handler.tags = ['group'];
handler.command = ['promote', 'promover'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

module.exports = handler;