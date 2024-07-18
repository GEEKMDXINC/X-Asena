const handler = async (message, { client }) => {
  if (!message.quoted) throw '✳️ Répondez au message que vous souhaitez supprimer.';
  
  try {
    const participant = message.message.extendedTextMessage.contextInfo.participant;
    const stanzaId = message.message.extendedTextMessage.contextInfo.stanzaId;

    await client.sendMessage(message.chat, {
      delete: { remoteJid: message.chat, fromMe: false, id: stanzaId, participant: participant },
    });
  } catch {
    const key = message.quoted.stanzaId;
    
    await client.sendMessage(message.chat, { delete: key });
  }
};

handler.help = ['delete'];
handler.tags = ['group'];
handler.command = /^del(ete)?$/i;
handler.group = false;
handler.admin = true;
handler.botAdmin = true;

module.exports = handler;