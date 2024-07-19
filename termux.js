const { WAConnection, MessageType } = require('@adiwajshing/baileys');
const qrcode = require('qrcode-terminal');

const conn = new WAConnection();

conn.on('qr', (qr) => {
  // Afficher le code QR
  qrcode.generate(qr, { small: true });
  console.log('Scan the QR code above to log in');
});

conn.on('open', () => {
  console.log('Logged in successfully!');
});

conn.connect();

// Fonction pour générer un code de jumelage
async function generatePairingCode() {
  const me = conn.user.jid;
  const code = await conn.generateInviteCode(me);
  console.log('Pairing code:', code);
}

// Appeler la fonction pour générer le code de jumelage
generatePairingCode();