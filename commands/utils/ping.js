module.exports = {
    name: 'ping',
    permissions: ['MENTION_EVERYONE'],
    category: 'utils',
    description: 'renvoie pong!',
    usage: "!ping",
    once: true,
    run: (client, message, args) => {
        message.channel.send("pong!");
    },
    runInteraction: (client, interaction) => {
        interaction.reply('Pong!');
    },

}