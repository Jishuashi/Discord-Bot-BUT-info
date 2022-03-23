const { Client } = require("discord.js");
const dotenv = require("dotenv");
dotenv.config();
const client = new Client({ intents: 98045 });

require("./utils/handlers/EventUtil")(client);


client.login(process.env.DISCORD_TOKEN);