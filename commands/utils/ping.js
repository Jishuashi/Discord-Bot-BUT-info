module.exports = {
    name: 'ping',
    once: true,
    run: (client, message, args) => {
        message.channel.send("pong!");
    },
}