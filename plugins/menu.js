const fs = require('fs');
const config = require('../settings');
const { lite, commands } = require('../lite');
const axios = require('axios');
const { getPrefix } = require('../lib/prefix');
const { runtime } = require('../lib/functions');
const moment = require("moment-timezone"); // Use timezone-aware moment


lite({
    pattern: "menu",
    react: "👁️",
    alias: ["allmenu"],
    desc: "Awaken the Shadow Menu",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, pushname, reply
}) => {
    try {
        let menu = {
            download: '', group: '', fun: '', owner: '',
            ai: '', anime: '', convert: '', reaction: '',
            main: '', logo: '', settings: '', other: ''
        };

        for (let i = 0; i < commands.length; i++) {
            let cmd = commands[i];
            if (cmd.pattern && !cmd.dontAddCommandList && menu.hasOwnProperty(cmd.category)) {
                menu[cmd.category] += `│ ⚔️ ${cmd.pattern}\n`;
            }
        }
        const currentTime = moment().tz("Africa/Harare").format("HH:mm:ss");
        const currentDate = moment().tz("Africa/Harare").format("dddd, MMMM Do YYYY");
        const prefix = getPrefix();

        let madeMenu = `
╭─❍ ⚔️ 𝐒𝐔𝐇𝐎 𝐌𝐃 ❍
│ 🧑‍💻 ʜᴜɴᴛᴇʀ: ${pushname}
│ 🌑 ᴍᴏᴅᴇ: [${config.MODE}]
│ 📖 ᴘʀᴇғɪx: [${prefix}]
│ ⏳ ᴛɪᴍᴇ   : ${currentTime}
│ 📆 ᴅᴀᴛᴇ   : ${currentDate}
│ ♾️ ᴜᴘᴛɪᴍᴇ : ${runtime(process.uptime())}
│ 🩸 ᴄᴏᴍᴍᴀɴᴅs: ${commands.length}
│ 👁️ ᴏᴡɴᴇʀ: ᴍʀ sᴜɴɢ 
│ ⚡ ᴠᴇʀsɪᴏɴ: ${config.version}-ᴀʟᴘʜᴀ
╰─────────────✦

┌──『 🩸 sʜᴀᴅᴏᴡ ᴍᴀɪɴ ᴄᴍᴅs 』
${menu.main || '│ (No commands found)'}
└────────────✦

┌──『 📥 ᴅᴏᴡɴʟᴏᴀᴅ ᴀʀᴛɪꜰᴀᴄᴛs 』
${menu.download || '│ (No commands found)'}
└────────────✦

┌──『 🧑‍💻 ᴏᴡɴᴇʀꜱ ᴅᴏᴍɪɴɪᴏɴ 』
${menu.owner || '│ (No commands found)'}
└────────────✦

┌──『 🧠 ᴀɪ ʀɪᴛᴜᴀʟꜱ 』
${menu.ai || '│ (No commands found)'}
└────────────✦

┌──『 👥 ɢᴜɪʟᴅ ᴄᴏᴍᴍᴀɴᴅs 』
${menu.group || '│ (No commands found)'}
└────────────✦

┌──『 ✨ ᴀɴɪᴍᴇ / ʟᴏɢᴏ ꜱᴘᴇʟʟs 』
${menu.anime || '│ (No commands found)'}
└────────────✦

┌──『 🔄 ᴄᴏɴᴠᴇʀꜱɪᴏɴꜱ 』
${menu.convert || '│ (No commands found)'}
└────────────✦

┌──『 🎭 ʀᴇᴀᴄᴛɪᴏɴ ᴀʙɪʟɪᴛɪᴇs 』
${menu.reaction || '│ (No commands found)'}
└────────────✦

┌──『 🎉 ꜰᴜɴ ʀᴇʟɪᴄs 』
${menu.fun || '│ (No commands found)'}
└────────────✦

┌──『 🎨 ʟᴏɢᴏ ꜱᴘᴇʟʟꜱ 』
${menu.logo || '│ (No commands found)'}
└─────────────✦

┌──『 🪄 ꜱᴇᴛᴛɪɴɢꜱ ʀɪᴛᴜᴀʟꜱ 』
${menu.settings || '│ (No commands found)'}
└─────────────✦

┌──『 👁️ ᴏᴛʜᴇʀ ᴀʙɪʟɪᴛɪᴇs 』
${menu.other || '│ (No commands found)'}
└─────────────✦

> ${config.DESCRIPTION}
`;

        await conn.sendMessage(
            from,
            {
                image: { url: config.MENU_IMAGE_URL },
                caption: madeMenu,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363402507750390@newsletter',
                        newsletterName: 'sᴜɴɢ sᴜʜᴏ ᴍᴅ',
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );


        await conn.sendMessage(from, {
            audio: fs.readFileSync('./all/menu.m4a'),
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (e) {
        console.error(e);
        reply(`${e}`);
    }
});
