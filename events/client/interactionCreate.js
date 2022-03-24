module.exports = {
    name: 'interactionCreate',
    once: false,
    async execute(client, interaction) {
        if (interaction.isCommand() || interaction.isContextMenu()) {
            const cmd = client.commands.get(interaction.commandName);

            if (!cmd) interaction.reply("Cette commande n'existe pas");
            if (!interaction.member.permissions.has([cmd.permissions])) return interaction.reply("Vous n'avez pas les permissions requise");

            cmd.runInteraction(client, interaction);
        }
    }
}