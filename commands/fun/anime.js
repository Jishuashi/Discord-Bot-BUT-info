const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');


module.exports = {
    name: 'anime',
    permissions: ['MENTION_EVERYONE'],
    category: 'fun',
    description: 'renvoie une même d\'anime',
    usage: "!anime",
    once: true,
    run: async(client, message, args) => {
        const anime = await fetch("https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500")
            .then(res => res.json())
            .then(json => json.data.children);

        const img = anime[Math.floor(Math.random() * anime.length)].data;

        const embed = new MessageEmbed()
            .setDescription(img.title)
            .setImage(img.url)
            .setColor('1E4F8A');

        message.channel.send({ embeds: [embed] });

    },
    runInteraction: async(client, interaction) => {
        const anime = await fetch("https://www.reddit.com/user/emdix/m/animemes/top/.json?sort=top&t=day&limit=500")
            .then(res => res.json())
            .then(json => json.data.children);

        const img = anime[Math.floor(Math.random() * anime.length)].data;

        const embed = new MessageEmbed()
            .setDescription(img.title)
            .setImage(img.url)
            .setColor('1E4F8A');

        interaction.reply({ embeds: [embed] });
    },

}