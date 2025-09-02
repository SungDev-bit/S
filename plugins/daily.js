// daily.js
// Created by dev sung 🤴

const { lite } = require('../lite');
const fs = require('fs');
const config = require('../settings');

const dataFile = './data/economy.json'; // File to store user balances

// Ensure database exists
if (!fs.existsSync(dataFile)) fs.writeFileSync(dataFile, JSON.stringify({ users: {} }));

lite({
    pattern: "daily",
    alias: [],
    desc: "Claim your daily coins reward",
    category: "economy",
    react: "📅",
    filename: __filename
}, async (conn, mek, m, { from, reply }) => {

    let db = JSON.parse(fs.readFileSync(dataFile));

    if (!db.users[from]) {
        db.users[from] = { coins: 1000, lastDaily: 0 }; // Initialize new user
    }

    const now = Date.now();
    const cooldown = 24 * 60 * 60 * 1000; // 24 hours
    const lastClaim = db.users[from].lastDaily || 0;

    if (now - lastClaim < cooldown) {
        const remaining = cooldown - (now - lastClaim);
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

        return reply(`⏳ You already claimed your daily reward!\nPlease wait ${hours}h ${minutes}m ${seconds}s.`);
    }

    // Daily reward amount
    const reward = 5000;
    db.users[from].coins += reward;
    db.users[from].lastDaily = now;

    // Styled message
    const message = `
╭───「 🎁 *Daily Reward* 🎁 」
│
│ 💰 You received: ${reward} coins
│ 🏦 New Balance: ${db.users[from].coins} coins
│
╰───────────────────────────╯
`;

    reply(message);

    // Save database
    fs.writeFileSync(dataFile, JSON.stringify(db, null, 2));
});
