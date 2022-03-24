module.exports = {
    name: 'ping',
    permissions: ['MENTION_EVERYONE'],
    category: 'utils',
    description: 'renvoie pong!',
    usage: "!ping",
    once: true,
    run: (client, message, args) => {
        fisrtArg = args[0];
        secondArg = args[1];
        emoji1 = args[2];
        emoji2 = args[3];

        //message.delete();

        const row = new MessageActionRow()
            .addComponents(
                new MessageButton()
                .setCustomId('primary')
                .setLabel('Primary')
                .setStyle('PRIMARY'))

        const embed = new MessageEmbed()
            .setColor('')
            .setTitle(':scroll: SONDAGE :scroll: ')
            .addField('1ère Proposition : ', `${fisrtArg}`)
            .addField('2ème Proposition : ', `${secondArg}`)
            .addField(':regional_indicator_v::regional_indicator_o::regional_indicator_t::regional_indicator_e::regional_indicator_z:', "En utilisant les réaction au message");


        message.channel.send({ embeds: [embed], components: [row] })

        setTimeout(() => {

            const embedEnd = new MessageEmbed()
                .setColor('')
                .setTitle(`Resultat du sondage :bar_chart:  :`)



            message.channel.send('Sondage terminer!');


        }, 120000);
    },
    runInterraction: (client, interaction) => {
        interaction.reply(`${interaction.name} n'admet pas de / commands`);
    },

}