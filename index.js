const { Client } = require("discord.js");
const dotenv = require("dotenv");

dotenv.config();

const client = new Client({ intents: 98045 });

client.once('ready', () => {
    console.log("Je suis prêt");
});

client.login(process.env.DISCORD_TOKEN);