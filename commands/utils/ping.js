module.exports = {
    name: 'ping',
    once: true,
    run: (client, message, args) => {
        console.log("pong!");
    },
}