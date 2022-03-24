const { MessageEmbed } = require("discord.js");
const { readdirSync } = require("fs");
const commandFolder = readdirSync('./commands');
const prefix = '!';

module.exports = {
    name: 'help',
    permissions: ['MENTION_EVERYONE'],
    description: 'renvoie l\'aide ',
    category: 'admin',
    usage: "!help <command>",
    once: true,
    run: (client, message, args) => {
        if (!args.length) {
            const noArgsEmbed = new MessageEmbed()
                .setColor("#230DA9")
                .addField('Listes des commandes', `Une liste de toute les catégorie disponnible et leurs commande.\npour plus d'information tapez \n \`${prefix}help <command>\``)


            for (const category of commandFolder) {
                noArgsEmbed.addField(`${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category.toLowerCase() == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``)
            }

            return message.channel.send({ embeds: [noArgsEmbed] });
        }

        cmd = client.commands.get(args[0]);
        if (!cmd) return message.channel.send("Cette commande n'existe pas");

        const argsEmbed = new MessageEmbed()
            .setColor("#230DA9")
            .setTitle(`\`${cmd.name}\``)
            .setDescription(`${cmd.description}`)
            .setFooter(`Usage --> ${cmd.usage}`);



        return message.channel.send({ embeds: [argsEmbed] });

    },
    options: [{
        name: "command",
        description: 'Tapez le nom de votre commande',
        type: "STRING",
        required: false
    }],
    runInteraction: (client, interaction) => {
        const cmdName = interaction.options.getString('command');

        if (!cmdName) {
            const noArgsEmbed = new MessageEmbed()
                .setColor("#230DA9")
                .addField('Listes des commandes', `Une liste de toute les catégorie disponnible et leurs commande.\npour plus d'information tapez \n \`${prefix}help <command>\``)


            for (const category of commandFolder) {
                noArgsEmbed.addField(`${category.replace(/(^\w|\s\w)/g, firstLetter => firstLetter.toUpperCase())}`,
                    `\`${client.commands.filter(cmd => cmd.category.toLowerCase() == category.toLowerCase()).map(cmd => cmd.name).join(', ')}\``)
            }

            return interaction.reply({ embeds: [noArgsEmbed], ephemeral: true });
        }

        cmd = client.commands.get(cmdName);
        if (!cmd) return interaction.reply({ content: "Cette commande n'existe pas", ephemeral: true });

        const argsEmbed = new MessageEmbed()
            .setColor("#230DA9")
            .setTitle(`\`${cmd.name}\``)
            .setDescription(`${cmd.description}`)
            .setFooter(`Usage --> ${cmd.usage}`);



        return interaction.reply({ embeds: [argsEmbed], ephemeral: true });

    }
}