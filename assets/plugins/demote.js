const handler = async (message, { client }) => {
  const demoteMessage = `✳️ Utilisation correcte de la commande\n*${message.usedPrefix + message.command}* @utilisateur`;

  if (!message.text && !message.quoted) {
    return client.reply(message.chat, demoteMessage, message);
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

  const isAdmin = await client.isGroupAdmin(message.chat, message.sender);
  if (!isAdmin) {
    return client.reply(message.chat, '⚠️ Vous devez être administrateur du groupe pour rétrograder un utilisateur.', message);
  }

  await client.groupMakeAdmin(message.chat, [user], false);
  client.reply(message.chat, '✅ Utilisateur rétrogradé', message);
};

handler.help = ['demote (@utilisateur)'];
handler.tags = ['group'];
handler.command = ['demote', 'degradar'];
handler.group = true;
handler.admin = true;
handler.botAdmin = true;
handler.fail = null;

module.exports = handler;