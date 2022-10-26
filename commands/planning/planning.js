const { default: axios } = require('axios');
const { constants } = require('buffer');
const { MessageEmbed, Collector } = require('discord.js');
const fs = require("fs");
const xml2js = require("xml2js");

module.exports = {
    name: 'planning',
    permissions: ['MENTION_EVERYONE'],
    category: 'planning',
    description: 'renvoie le planning du jour',
    usage: "!planning <demain ou rien>",
    once: true,
    run: (client, message, args) => {
        function saveBDD(pEvents) {
            let donnees = JSON.stringify(pEvents)
            fs.writeFileSync("./edt.json", donnees)
        };

        function compareTo(pObj1, pObj2) {
            if (pObj1.starttime[0] != pObj2.starttime[0]) {
                return true;
            } else if (pObj1.starttime[0] == pObj2.endtime[0]) {
                return true;
            } else return false;
        };

        axios({
                method: 'get',
                url: 'http://chronos.iut-velizy.uvsq.fr/EDT/g536.xml',
                responseType: 'application/xml',
            })
            .then(function(response) {
                const xmlFileEDT = response.data;
                xml2js.parseString(xmlFileEDT, (err, result) => {
                    let events = result.timetable.event
                    saveBDD(events);
                })
            });


        let edtJson = fs.readFileSync("./edt.json");
        let edtParsed = JSON.parse(edtJson);

        let indexWeek = 4;

        let currentDate = new Date();
        let dayEDT = [String(currentDate.getDay() - 1), String(currentDate.getDay())];

        let indexofDay = 0;

        let lenghtEdt = Object.keys(edtParsed).length;
        let indexDay = 0;



        if (args[0] == 'Demain' || args[0] == 'demain') {

            console.log(String(currentDate.getDay()));

            for (let e = 0; e < lenghtEdt; e++) {
                if (edtParsed[e].day == dayEDT[1]) {
                    indexofDay = e;
                    break;
                }
            }

            indexDay = 1;

        } else {
            for (let g = 0; g < lenghtEdt; g++) {

                if (edtParsed[g].day == dayEDT[0]) {
                    indexofDay = g;
                    break;
                }
            }
        }

        let dayArray = [];
        let testDay = [];
        let i = indexofDay;
        let indexEnd = 0

        for (let j = indexofDay; j < lenghtEdt; j++) {
            console.log(edtParsed[j].resources[0].module);
            if (dayEDT[indexDay] != edtParsed[j].day[0]) {
                indexEnd = j;
                break;
            }
        }

        while (i < lenghtEdt) {

            if (dayEDT[indexDay] != edtParsed[i].day[0]) {
                indexEnd = i;
                break;
            }

            if (i == indexofDay || compareTo(edtParsed[i], edtParsed[i - 1])) {

                if (edtParsed[i].resources[0].module == undefined) {
                    if (edtParsed[i].notes == undefined) {
                        dayArray.push([edtParsed[i].prettytimes[0], "Cours Non Défini", edtParsed[i].resources[0].staff[0].item, edtParsed[i].resources[0].room[0].item]);

                    } else {
                        dayArray.push([edtParsed[i].prettytimes[0], edtParsed[i].notes[0], edtParsed[i].resources[0].staff[0].item, edtParsed[i].resources[0].room[0].item]);
                    }
                } else if (edtParsed[i].resources[0].staff == undefined) {
                    dayArray.push([edtParsed[i].prettytimes[0], edtParsed[i].resources[0].module[0].item, "Autonomie", edtParsed[i].resources[0].room[0].item]);
                } else if (edtParsed[i].resources[0].room == undefined) {
                    dayArray.push([edtParsed[i].prettytimes[0], edtParsed[i].resources[0].module[0].item, edtParsed[i].resources[0].staff[0].item, "Salle Non Définie"]);
                } else {

                    if (edtParsed[i].notes != undefined) {
                        dayArray.push([edtParsed[i].prettytimes[0], edtParsed[i].resources[0].module[0].item, edtParsed[i].resources[0].staff[0].item, edtParsed[i].notes[0], edtParsed[i].resources[0].room[0].item]);

                    } else {
                        dayArray.push([edtParsed[i].prettytimes[0], edtParsed[i].resources[0].module[0].item, edtParsed[i].resources[0].staff[0].item, edtParsed[i].resources[0].room[0].item]);
                    }
                }

            }


            i += indexWeek;
        }

        let dayString = new String("-----------------------\n");

        for (let m = 0; m < dayArray.length; m++) {
            for (let f = 0; f < dayArray[m].length; f++) {
                dayString += dayArray[m][f] + "\n";
            }

            dayString += "\n"
        };

        const embedDay = new MessageEmbed()
            .setColor("1E4F8A")
            .setTitle("Grp C Planning du Jour :")
            .addField(":date:", dayString)

        message.channel.send({ embeds: [embedDay] });
    },
    runInteraction: (client, interaction) => {
        interaction.reply(`N\'accepte pas les / commands`);
    },

}