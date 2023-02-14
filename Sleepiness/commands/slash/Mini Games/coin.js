const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "монетка",
    description: "Мини игра: подбрось монетку",
    type: 1,
    options: [
        {
            type: 3, name: 'сторона', description: 'Попробуй угадать куда упадёт монетка.',
            choices: [
                { value: 'reshka', name: 'решка' },
                { value: 'orel', name: 'орёл' },
            ], required: true,
        },
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    run: async (client, interaction, config, db) => {

        const value =  interaction.options.getString('сторона', interaction);
        let coin  = false;
        if(value == 'reshka') coin = true;
		else if(value == 'orel') coin = false;
        const toss = Math.floor(Math.random() * 1002);

        await interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌕**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌖**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌗**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌘**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌑**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌒**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌓**`)
                    .setColor('White')
            ],
        })
        await wait(250);
        await interaction.editReply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(` **Бросок! 🌔**`)
                    .setColor('White')
            ],
        })
        if(coin) {
            if(toss <= 500) {
                await wait(250);
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Бросок! 🌓**`)
                            .setColor('White')
                    ],
                })
                await wait(250);
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Бросок! 🌒**`)
                            .setColor('White')
                    ],
                })
                await wait(250);
                return await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Решка!** 🌑\nТы выбрал \`решку\`, похоже ты выиграл\nНе хочешь сыграть ещё раз?`)
                            .setColor('White')
                    ],
                });
            }
            else if(toss <= 1000) {
                await wait(250);
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Бросок! 🌗**`)
                            .setColor('White')
                    ],
                })
                await wait(250);
                await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Бросок! 🌖**`)
                            .setColor('White')
                    ],
                })
                await wait(250);
                return await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Орёл! 🌕**\nТы выбрал \`решку\` и проиграл.\nНе растраивайся, всегда можно сыграть ещё раз!`)
                            .setColor('White')
                    ],
                });
            }  
            else {
                await wait(250);
                return await interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(` **Упс... Монета упала на ребро 🌓** Кажется никто не выиграл, не повод ли это сыграть ещё раз?`)
                            .setColor('White')
                        ],
                    });
                }
            }

            if(!coin) {
                if(toss <= 500) {
                    await wait(250);
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Бросок! 🌓**`)
                                .setColor('White')
                        ],
                    })
                    await wait(250);
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Бросок! 🌒**`)
                                .setColor('White')
                        ],
                    })
                    await wait(250);
                    return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Решка!** 🌑\nТы выбрал \`орла\` и проиграл.\nНе растраивайся, всегда можно сыграть ещё раз!`)
                                .setColor('White')
                        ],
                    });
                }
                else if(toss <= 1000) {
                    await wait(250);
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Бросок! 🌗**`)
                                .setColor('White')
                        ],
                    })
                    await wait(250);
                    await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Бросок! 🌖**`)
                                .setColor('White')
                        ],
                    })
                    await wait(250);
                    return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Орёл! 🌕**\nТы выбрал \`орла\`, похоже ты выиграл\nНе хочешь сыграть ещё раз?`)
                                .setColor('White')
                        ],
                    });
                }  
                else {
                    await wait(250);
                    return await interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                                .setDescription(` **Упс... Монета упала на ребро 🌓** Кажется никто не выиграл, не повод ли это сыграть ещё раз?`)
                                .setColor('White')
                            ],
                        });
                    }
                }
    },
};