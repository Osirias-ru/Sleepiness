const { AttachmentBuilder, MessageCollector, EmbedBuilder } = require('discord.js');
const { readFileSync } = require('fs');
const createHangman = require("../../../assets/createHangman");

module.exports = {
    config: {
        name: "виселица",
        description: "Мини игра: виселица.",
    },
    permissions: ['SendMessages'],
    owner: false,
    run: async (client, message, args, prefix) => {

        if (args[0] != 'страна' && args[0] != 'существительное' && args[0] != 'сущ' && args[0] != 'сущь') return message.reply({ embeds: [
            new EmbedBuilder()
              .setTitle("Ошибка")
              .setDescription("Выбери действительный тип загадываемого слова\`(страна/существительное)\`!")
              .setColor("Red")
          ]});
      
        if (args[1] != 'легко' && args[1] != 'изи' && args[1] != 'норм' && args[1] != 'нормально' && args[1] != 'хард' && args[1] != 'сложно') return message.reply({ embeds: [
            new EmbedBuilder()
              .setTitle("Ошибка")
              .setDescription("Укажи действительную сложность!(легко/сложно)")
              .setColor("Red")
          ]});

        let type;
        let difficulty;

        if (args[0] == 'страна') 
            type = 'countries';

        else if (args[0] != 'существительное' || args[0] != 'сущ' || args[0] != 'сущь')
            type = 'nouns';

        if (args[1] == 'легко' || args[1] == 'изи')
            difficulty = 'easy';

        else if (args[1] == 'хард' && args[1] == 'сложно')
            difficulty = 'hard';

        const words = readFileSync(`./assets/${difficulty}${type}Words`, { encoding: 'utf-8' }).split("\n");
        let wrongs = 0, at = new AttachmentBuilder(await createHangman(wrongs), { name:"game.png"});
        let word = words[Math.floor(Math.random() * words.length+1)];
        word = word.replace(/[^а-я]/gi, '');

        console.log('\`' + word + '\`');

        let used = [];

        const sendmsg = await message.reply({
            files: [at],
            embeds: [
                new EmbedBuilder()
                .setTitle("Виселица")
                .setDescription(`Пиши буквы, чтобы угадать слово\n\n\`\`\`${word.split("").map(v => used.includes(v) ? v.toUpperCase() : "_").join(" ")}\`\`\``)
                .setColor('White')
                .setImage("attachment://game.png") 
            ]
        });

        const col = new MessageCollector(message.channel, {
            filter: m => m.author.id === message.author.id,
            time: 600000
        });

        col.on('collect', async (msg) => {
            //console.log('\`' + msg.content + '\`' + ' to ' + '\`' + msg.content.toLowerCase() + '\`');

            if(word == msg.content.toLowerCase()) {
                await sendmsg.edit({
                    files: [new AttachmentBuilder(await createHangman(wrongs), {name: "game.png"} )],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Виселица")
                        .setDescription(`Молодец! Ты угадал слово \`${word}\`!`)
                        .setColor("Green")
                        .setImage("attachment://game.png") 
                    ]
                });
                col.stop()
            }
            else if(msg.content[1]) {
                await sendmsg.edit({
                    files: [new AttachmentBuilder(await createHangman(6), {name: "game.png"} )],
                    embeds: [
                        new EmbedBuilder()
                        .setTitle("Виселица")
                        .setDescription(`Неверно! Поскольку ты написал мне слово и не угадал, мне придётся закончить игру, загадонное слово было \`${word}\``)
                        .setColor("Red")
                        .setImage("attachment://game.png") 
                    ]
                });
                col.stop()
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

                await sendmsg.edit({
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
    }
}