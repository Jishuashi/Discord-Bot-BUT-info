module.exports = {
    name: 'avatar',
    permissions: ['MENTION_EVERYONE'],
    category: 'fun',
    description: 'Donne l\'avatar en .png  de vous ',
    usage: "!avatar <@mention ou rien>",
    once: true,
    run: (client, message, args) => {
        return message.channel.send(`Votre Avatar est : ${message.author.displayAvatarURL({format:'png'})}`);
    },
    runInterraction: (client, interaction) => {
        return interaction.reply(`Votre Avatar est : ${interaction.member.displayAvatarURL({format:'png'})}`);
    },

}