const { lite, commands } = require('../lite');
const config = require('../settings'); // Make sure MENU_IMAGE_URL is defined in settings.js

lite({
    pattern: "owner",
    alias: ["developer", "dev"],
    desc: "Displays the developer info",
    category: "owner",
    react: "👁️",
    filename: __filename
}, async (conn, mek, m, {
    from, reply, pushname
}) => {
    try {
        const name = pushname || "Hunter";

        const text = `
╭─⌈ ⚔️ *SUHO-MD SYSTEM: DEVELOPER* ⚔️ ⌋
│
│ 👋 Greetings, *${name}*...
│
│ 👁️ Within the shadows, I stand as
│    the Architect of this System.
│
│ 🧩 *DEVELOPER DETAILS:*
│ ───────────────
│ 🩸 *Name* : Mr Sung
│ ⏳ *Age* : +20
│ 📞 *Contact* : wa.me/1(236)362-1958
│ 📜 *YouTube* :
│    https://youtube.com/@malvintech2
│
│ ⚡ This system is forged in darkness
│    and powered by *Mr Sung*
╰─────────────────────`.trim();

        await conn.sendMessage(from, {
            image: { url: config.MENU_IMAGE_URL || 'https://telegra.ph/file/3b66b4f8bd5c0556d4fb9.jpg' },
            caption: text,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363402507750390@newsletter',
                    newsletterName: '『 sᴜʜᴏ ᴍᴅ 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.error("Error in .dev command:", e);
        reply(`❌ Error: ${e.message}`);
    }
});
