const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    config: {
        name: "монетка",
        description: "Мини игра: монетка.",
      },
      permissions: ['SendMessages'],
      owner: false,
    run: async (client, message, args, prefix) => {

        const toss = Math.floor(Math.random() * 1002);

        const msg = await message.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌕**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌖**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌗**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌘**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌑**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌒**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌓**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await msg.edit({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌔**`)
                    .setColor('White')
            ],
        })
        if(toss <= 500) {
            return msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(` **Решка! 🌑**`)
                        .setColor('White')
                ],
            })
        }
        else if(toss <= 1000) {
            return msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(` **Орёл! 🌕**`)
                        .setColor('White')
                ],
            })
        }
        else {
            return msg.edit({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(` **Упс... Монета упала на ребро 🌓**`)
                        .setColor('White')
                ],
            })
        }

    },
};