const { AttachmentBuilder, MessageCollector, EmbedBuilder } = require('discord.js');
const { readFileSync } = require('fs');
const createHangman = require("../../../assets/createHangman");

module.exports = {
    name: "виселица",
    description: "Мини игра: висилица",
    type: 1,
    options: [
        {
            type: 3, name: 'тип', description: 'Выбери тип загадываемых слов.',
            choices: [
                { value: 'countries', name: 'страны' },
                { value: 'nouns', name: 'существительные' },

            ], required: true,
        },
        {
            type: 3, name: 'сложность', description: 'Выбери тип загадываемых слов.',
            choices: [
                { value: 'easy', name: 'легко' },
                { value: 'hard', name: 'сложно' },

            ], required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    timeout: 10000,

    run: async (client, interaction) => {
        await interaction.deferReply();

        const type =  interaction.options.getString('тип', interaction);
        const difficulty =  interaction.options.getString('сложность', interaction);

        const words = readFileSync(`./assets/${difficulty}${type}Words`, { encoding: 'utf-8' }).split("\n");

        let wrongs = 0, at = new AttachmentBuilder(await createHangman(wrongs), { name:"game.png"});
        let word = words[Math.floor(Math.random() * words.length+1)];
        word = word.replace(/[^а-я]/gi, '');

        console.log('\`' + word + '\`');

        let used = [];

        await interaction.editReply({
            files: [at],
            embeds: [
                new EmbedBuilder()
                .setTitle("Виселица")
                .setDescription(`Пиши буквы, чтобы угадать слово\n\n\`\`\`${word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")}\`\`\``)
                .setColor('White')
                .setImage("attachment://game.png") 
            ]
        });

        const col = new MessageCollector(interaction.channel, {
            filter: m => m.author.id === interaction.user.id,
            time: 600000
        });

        col.on('collect', async (msg) => {
            //console.log('\`' + msg.content + '\`' + ' to ' + '\`' + msg.content.toLowerCase() + '\`');

            if(word == msg.content.toLowerCase()) {
                await interaction.editReply({
                    files: [new AttachmentBuilder(await createHangman(wrongs), {name: "game.png"} )],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Виселица")
                        .setDescription(`Молодец! Ты угадал слово \`${word}\`!`)
                        .setColor("Green")
                        .setImage("attachment://game.png") 
                    ]
                });
                col.stop();
            }
            else if(msg.content[1]) {
                await interaction.editReply({
                    files: [new AttachmentBuilder(await createHangman(6), {name: "game.png"} )],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Виселица")
                        .setDescription(`Неверно! Поскольку ты написал мне слово и не угадал, мне придётся закончить игру, загадонное слово было \`${word}\``)
                        .setColor("Red")
                        .setImage("attachment://game.png") 
                    ]
                });
                col.stop();
            }
            else {
                const char = msg.content[0]?.toLowerCase();

                msg.delete();

                if (!/[а-я]/i.test(char)) return msg.channel.send("В слове загаданы **только буквы**, никаких чисел или других символов").then((m) => setTimeout(() => m.delete().catch(e => { }), 1500));
                if (used.includes(char)) return msg.channel.send(`Ты уже писал букву \`${char}\``).then((m) => setTimeout(() => m.delete().catch(e => { }), 1500));

                used.push(char);

                if (!word.includes(char)) wrongs++;

                let done = word.split("").every(v => used.includes(v));
                let description = wrongs === 6 || done ? `Ты ${done ? "выиграл" : "проиграл"}. Загаданое слово - **${word}**` : `Пиши буквы, чтобы угадать слово\n\n\`\`\`${word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")}\`\`\``

                await interaction.editReply({
                    files: [new AttachmentBuilder(await createHangman(wrongs), {name: "game.png"} )],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Виселица")
                        .setDescription(description)
                        .setColor(wrongs === 6 ? "Red" : done ? "Green" : "White")
                        .setImage("attachment://game.png") 
                    ]
                });

                if (wrongs === 6 || done) col.stop();
            }
        })

        col.on('end', (s, r) => {
            if (r === "time") {
                interaction.editReply({
                    attachments: [],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Игра окончена")
                        .setDescription(`Ты думал слишком долго, настолько что мне пришлось закончить взаимодействие, если хочешь поиграть ещё, то просто повтори команду`)
                        .setColor('Red')
                    ]
                });
            }
        })
    }
}