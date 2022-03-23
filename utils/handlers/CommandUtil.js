const { promisify } = require("util");
const { glob } = require("glob");
const pGlob = promisify(glob);

module.exports = async client => {
    (await pGlob(`${process.cwd()}/commands/*/*.js`)).map(async cmdFile => {
        const cmd = require(cmdFile);

        if (!cmd.name) return console.log(`------------------\nCommande non chargé: erreur de typo (ou pas de nom)\n Fichier --> ${cmdFile}\n------------------`)


        console.log(cmd.name, cmd)
        client.commands.set(cmd.name, cmd);

        console.log(`Commande chargé : ${cmd.name}`);

    })
}