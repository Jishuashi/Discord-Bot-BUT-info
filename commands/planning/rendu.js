const { MessageEmbed } = require('discord.js');
const fetch = require('node-fetch');
const fs = require("fs");

module.exports = {
    name: 'rendu',
    permissions: ['MENTION_EVERYONE'],
    category: 'utils',
    description: 'renvoie pong!',
    usage: "!ping",
    once: true,
    run: (client, message, args) => {
        function saveBDD(pEvents) {
            let donnees = JSON.stringify(pEvents)
            fs.writeFileSync("./renduJSON.json", donnees)
        }

        let renduJSON = fs.readFileSync("./renduJSON.json");
        let renduParsed = JSON.parse(renduJSON);

        if (args[0] == "add") {
            if (args[1] == "rendu") {
                let strName = "```";

                for (let m = 7; m < args.length; m++) {
                    strName += args[m] + " ";
                }

                strName += "```"

                let objectRendu = { "name": strName, "date": `${args[3]} ${args[4]} ${args[5]} ${args[6]}`, "id": (renduParsed.rendu.id + 1) };

                renduParsed.rendu.id = objectRendu.id;

                if (renduParsed.rendu.matiere[args[2]] != undefined) {
                    renduParsed.rendu.matiere[args[2]].push(objectRendu);
                    client.channels.cache.get("894186160136552469").send("@everyone un nouveau rendu pour le " + `${args[3]} ${args[4]} ${args[5]} ${args[6]} en ${args[2]}, il faut faire ${strName}`);
                    message.channel.send(`Ajouter avec succes`);

                } else {
                    message.channel.send(`La matière ${args[2]} n'existe pas , Pour voir les matière existant --> '''&rendu see matière'''`)
                }

            } else if (args[1] == "controle") {
                let strName = "```";

                for (let k = 7; k < args.length; k++) {
                    strName += args[k] + " ";
                }

                strName += "```"

                let objectRendu = { "name": strName, "date": `${args[3]} ${args[4]} ${args[5]} ${args[6]}`, "id": (renduParsed.controle.id + 1) };

                renduParsed.controle.id = objectRendu.id;

                if (renduParsed.controle.matiere[args[2]] != undefined) {
                    renduParsed.controle.matiere[args[2]].push(objectRendu);
                    client.channels.cache.get("894186160136552469").send("@everyone un nouveau contrôle pour le " + `${args[3]} ${args[4]} ${args[5]} ${args[6]} en ${args[2]}, il faut révisé ${strName}`);
                    message.channel.send(`Ajouter avec succes`);
                } else {
                    message.channel.send(`La matière ${args[2]} n'existe pas , Pour voir les matière existant --> '''&rendu see matière'''`)
                }

            } else {
                message.channel.send(`${args[1]} : n'est pas un argument valide`)
            }


            saveBDD(renduParsed);
        } else if (args[0] == "see") {
            const embed = new MessageEmbed()
                .setColor("1E4F8A")
                .setTitle(args[1] + ":")
                .addField("------------------------", `Voici les ${args[1]}s`);

            if (args[1] == "rendu") {
                let strRendu = new String();

                for (let i = 0; i < renduParsed.nom_matiere.length; i++) {
                    let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[i]];

                    if (matiereRendu.length != 0) {
                        for (let j = 0; j < matiereRendu.length; j++) {
                            strRendu += `${matiereRendu[j].id}. ${matiereRendu[j].date} \n ${matiereRendu[j].name}` + "\n";
                        }

                        embed.addField(renduParsed.nom_matiere[i], strRendu);
                        strRendu = new String();
                    }
                }

                message.channel.send({ embeds: [embed] });
            } else if (args[1] == "controle") {
                let strControle = new String();

                for (let l = 0; l < renduParsed.nom_matiere.length; l++) {
                    let matiereControle = renduParsed.controle.matiere[renduParsed.nom_matiere[l]];

                    if (matiereControle.length != 0) {
                        for (let p = 0; p < matiereControle.length; p++) {
                            strControle += `${matiereControle[p].id}. ${matiereControle[p].date} \n ${matiereControle[p].name}` + "\n";
                        }



                        embed.addField(renduParsed.nom_matiere[l] + ":", strControle);
                        strControle = new String();
                    }
                }


                console.log(embed);
                message.channel.send({ embeds: [embed] });
            } else if (args[1] == "matière") {
                let strMatiere = new String();

                for (let e = 0; e < renduParsed.nom_matiere.length; e++) {
                    strMatiere += renduParsed.nom_matiere[e] + "\n";
                }

                embed.addField("Liste des matière :", strMatiere);

                message.channel.send({ embeds: [embed] });

            } else if (args[1] == undefined) {
                let strRendu = new String();
                let strControle = new String();

                const embedR = new MessageEmbed()
                    .setColor("1E4F8A")
                    .setTitle("Rendu" + ":")
                    .addField("------------------------", "Voici la liste des rendus")

                const embedC = new MessageEmbed()
                    .setColor("1E4F8A")
                    .setTitle("Controle " + ":")
                    .addField("------------------------", "Voici la liste des contrôles")

                for (let i = 0; i < renduParsed.nom_matiere.length; i++) {
                    let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[i]];

                    if (matiereRendu.length != 0) {
                        for (let j = 0; j < matiereRendu.length; j++) {
                            strRendu += `${matiereRendu[j].id}. ${matiereRendu[j].date} \n ${matiereRendu[j].name}` + "\n";
                        }

                        embedR.addField(renduParsed.nom_matiere[i], strRendu);
                        strRendu = new String();
                    }
                }

                for (let l = 0; l < renduParsed.nom_matiere.length; l++) {
                    let matiereControle = renduParsed.controle.matiere[renduParsed.nom_matiere[l]];

                    if (matiereControle.length != 0) {
                        for (let p = 0; p < matiereControle.length; p++) {
                            strControle += `${matiereControle[p].id}. ${matiereControle[p].date} \n ${matiereControle[p].name}` + "\n";
                        }


                        embedC.addField(renduParsed.nom_matiere[l] + ":", strControle);
                        strControle = new String();
                    }
                }

                message.channel.send({ embeds: [embedR] });
                message.channel.send({ embeds: [embedC] });

            } else {
                message.channel.send(`${args[1]} : n'est pas un argument valide`);
            }


        } else if (args[0] == "remove") {
            let id = parseInt(args[2]);

            if (args[1] == "rendu") {
                if (id <= renduParsed.rendu.id) {
                    for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                        let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[n]];
                        for (let t = 0; t < matiereRendu.length; t++) {
                            if (matiereRendu[t].id == id) {
                                matiereRendu.splice(t);
                                message.channel.send(`Remove avec succes`);
                                saveBDD(renduParsed);

                                return;
                            }
                        }
                    }

                    message.channel.send(`L'id -> ${id} n'est pas valide`);

                } else {
                    message.channel.send(`L'id -> ${id} n'est pas valide`);
                }

            } else if (args[1] == "controle") {
                if (id <= renduParsed.controle.id) {
                    for (let o = 0; o < renduParsed.nom_matiere.length; o++) {
                        let matiereControle = renduParsed.controle.matiere[renduParsed.nom_matiere[o]]

                        for (let u = 0; u < matiereControle.length; u++) {
                            if (matiereControle[u].id == id) {
                                matiereControle.splice(u);
                                message.channel.send('Remove avec succes');
                                saveBDD(renduParsed);
                                return;
                            }
                        }
                    }

                    message.channel.send(`L'id -> ${id} n'est pas valide`);

                } else {
                    message.channel.send(`L'id -> ${id} n'est pas valide`);
                }

            } else {
                message.channel.send(`${args[1]} : n'est pas un argument valide`);
            }


        } else if (args[0] == "modify") {
            let id = args[3];
            let str = "";

            for (let s = 4; s < args.length; s++) {
                str += args[s] + " ";
            }

            if (args[2] == "date") {
                if (id <= renduParsed.rendu.id && args[1] == "rendu") {

                    for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                        let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[n]];

                        for (let t = 0; t < matiereRendu.length; t++) {

                            if (matiereRendu[t].id == id) {
                                matiereRendu[t].date = str;
                                message.channel.send(`Modifier avec succes`);
                                saveBDD(renduParsed);

                                return;
                            }
                        }
                    }

                } else if (id <= renduParsed.controle.id && args[1] == "controle") {
                    for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                        let matiereControle = renduParsed.controle.matiere[renduParsed.nom_matiere[n]];

                        for (let t = 0; t < matiereControle.length; t++) {
                            if (matiereControle[t].id == id) {
                                matiereControle[t].date = str;
                                message.channel.send(`Modifier avec succes`);
                                saveBDD(renduParsed);

                                return;
                            }
                        }
                    }
                } else {
                    message.channel.send(`L'argument ${args[1]} ou ${args[3]} n'est pas valide`);
                }
            } else if (args[2] == "description") {

                if (id <= renduParsed.rendu.id && args[1] == "rendu") {

                    for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                        let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[n]];

                        for (let t = 0; t < matiereRendu.length; t++) {
                            console.log(matiereRendu[t].id == id);
                            if (matiereRendu[t].id == id) {
                                matiereRendu[t].name = "```" + str + "```";
                                message.channel.send(`Modifier avec succes`);
                                saveBDD(renduParsed);

                                return;
                            }

                        }
                    }

                } else if (id <= renduParsed.controle.id && args[1] == "controle") {
                    for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                        let matiereControle = renduParsed.controle.matiere[renduParsed.nom_matiere[n]];

                        for (let t = 0; t < matiereControle.length; t++) {
                            if (matiereControle[t].id == id) {
                                matiereControle[t].name = "```" + str + "```";
                                message.channel.send(`Modifier avec succes`);
                                saveBDD(renduParsed);

                                return;
                            }
                        }
                    }
                } else {
                    message.channel.send(`L'argument ${args[1]} ou ${args[3]} n'est pas valide`);
                }

            } else if (args[2] == "matière") {
                if (args[1] == "rendu") {
                    let matiereRenduNew = renduParsed.rendu.matiere[args[4]]

                    if (id <= renduParsed.rendu.id) {
                        for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                            let matiereRendu = renduParsed.rendu.matiere[renduParsed.nom_matiere[n]];

                            for (let t = 0; t < matiereRendu.length; t++) {
                                console.log(matiereRendu[t].id)
                                if (matiereRendu[t].id == id) {
                                    matiereRenduNew.push(matiereRendu[t]);
                                    matiereRendu.splice(t);
                                    message.channel.send(`Modifier avec succes`);
                                    saveBDD(renduParsed);

                                    return;
                                }
                            }
                        }
                    }

                } else if (args[1] == "controle") {
                    let matiereRenduNew = renduParsed.controle.matiere[args[4]]

                    if (id <= renduParsed.controle.id) {
                        for (let n = 0; n < renduParsed.nom_matiere.length; n++) {
                            let matiereControle = renduParsed.rendu.matiere[renduParsed.nom_matiere[n]];

                            for (let t = 0; t < matiereRendu.length; t++) {
                                console.log(matiereControle[t].id)
                                if (matiereRendu[t].id == id) {
                                    matiereRenduNew.push(matiereControle[t]);
                                    matiereControle.splice(t);
                                    message.channel.send(`Modifier avec succes`);
                                    saveBDD(renduParsed);

                                    return;
                                }
                            }
                        }
                    }
                } else {
                    message.channel.send(`L'argument ${args[1]} n'est pas valide`);
                }

            } else {
                message.channel.send(`L'argument ${args[2]} n'est pas valide`);
            }
        } else {
            message.channel.send(`${args[0]} : n'est pas un argument valide`);
        }
    },
    runInterraction: (client, interaction) => {
        interaction.reply('Rendu n\'accepte pas les / commands');
    },

}