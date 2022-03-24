module.exports = {
    name: 'server',
    permissions: ['MENTION_EVERYONE'],
    category: 'fun',
    description: 'Donne le nom du serveur avec le nombre de membre dessus',
    usage: "!serveur",
    once: true,
    run: (client, message, args) => {
        message.channel.send(`Nom du Serveur: ${message.guild.name}\n Nombre d'utilisateurs: ${message.guild.memberCount}`);
    },
    runInterraction: (client, interaction) => {
        interaction.reply(`Nom du Serveur: ${interaction.guild.name}\n Nombre d'utilisateurs: ${interaction.guild.memberCount}`);
    },

}