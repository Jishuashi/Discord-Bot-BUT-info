module.exports = {
    name: 'ready',
    once: true,
    async execute(client) {
        console.log("Je suis ready");

        const devGuild = await client.guilds.cache.get('952691106712260708');
        devGuild.commands.set(client.commands.map(cmd => cmd))
    }
}