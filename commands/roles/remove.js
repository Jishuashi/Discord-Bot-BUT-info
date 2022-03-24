module.exports = {
    name: 'add',
    permissions: ['MENTION_EVERYONE'],
    category: 'roles',
    description: 'Vous ajoute le rôle demander',
    usage: "!add <nom du role>",
    once: true,
    run: (client, message, args) => {

        let role = message.guild.roles.cache.find(r => r.name === args.toString());

        if (role) {
            if (message.member.roles.cache.has(role.id)) {
                return message.channel.send("Vous avez déjà le rôle! Essayer à nouveau!");
            }

            if (role.permissions.has('SEND_TTS_MESSAGES')) {
                return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
            }

            /*if (role.id === '760154858157375539') {
                return message.channel.send("Vous êtes en :a: pas en :b:");
            }
            if (role.id === '760154860787597343') {
                return message.channel.send("Vous êtes en :c::1: pas en :a:");
            }
            */

            if (role.permissions.has('KICK_MEMBERS')) {
                return message.channel.send("Vous ne pouvez pas avoir ce rôle!");
            }

            message.member.roles.add(role)
                .then(m => message.channel.send(`Vous possedez maintenant le rôle ${role.name}.`))
                .catch(e => console.log(e));
        } else {
            message.channel.send("Le rôle n'existe pas!")
        }

    },
    runInterraction: (client, interaction) => {
        interaction.reply('Pong!');
    },

}