const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
    name: "кнб",
    description: "Мини игра: камень/ножницы/бумага",
    type: 1,
    options: [
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    timeout: 10000,
    run: async (client, interaction, config, db) => {
        const author = interaction.user.id;

        let hand = [{ txtru: "камень", txt: 'Rock', emoji: '✊', index: 0 }, { txtru: "бумагу", txt: 'Paper', emoji: '🤚', index: 1 }, { txtru: "ножницы", txt: 'Scissors', emoji: '✌️', index: 2 }]; // Defining Moves
        await interaction.deferReply();
        let rpsMsg = await interaction.editReply({
            embeds: [
                new EmbedBuilder() 
                    .setColor('White')
                    .setTitle('Камень/Ножницы/Бумага')
                    .setDescription('Выбери как сходить, я уже выбрал свой ход и не буду подсматривать!')
            ],
            components: [
                new ActionRowBuilder()
                    .addComponents(
                        new ButtonBuilder()
                            .setCustomId(`rps_rock`)
                            .setEmoji("✊")
                            .setLabel(" Камень")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId(`rps_scissors`)
                            .setEmoji("✌️")
                            .setLabel(" Ножницы")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId(`rps_paper`)
                            .setEmoji("🤚")
                            .setLabel(" Бумага")
                            .setStyle(ButtonStyle.Secondary),
                        new ButtonBuilder()
                            .setCustomId(`rps_close`)
                            .setEmoji("🛑")
                            .setLabel("Стоп")
                            .setStyle(ButtonStyle.Danger)
                    )
            ]
        })
        let win = 0; // 0 = Loss; 1 = Tie; 2 = Win
        let userMove;
        let coutWin = 0, coutGame = 0;

        const collector = rpsMsg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 120000 });

        collector.on('collect',  async i => {
            if (i.customId.startsWith('rps')) {
                const botMove = hand[Math.floor(Math.random() * 3)];
            if (!i.isButton()) return; 

            if(author != i.user.id) return await i.reply({
                embeds: [
                    new EmbedBuilder()
                        .setDescription(`Хей, это не твоя игра, как насчет начать свою по команде \`/кнб\` ?`)
                ],
                ephemeral: true
            });

            if (i.customId.startsWith('rps')) {
                ++coutGame;
                let move = i.customId.split('_')[1]
                if(move == 'close') {
                    const description = (coutWin % 10 > 1 && coutWin % 10 < 5) ? "раза" : "раз"
                    return interaction.editReply({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle("Игра окончена")
                            .setDescription(`Спасибо за игру!\nТы выиграл ${coutWin} ${description} из ${coutGame - 1} игр`)
                            .setColor('Red')
                        ],
                        components:[]
                    });
                }
                if(move == 'close') {
                    return await i.reply({
                        embeds: [
                            new EmbedBuilder() 
                                .setColor('Red')
                                .setTitle('Камень/Ножницы/Бумага')
                                .setDescription('Вы уверены что хотите завершить игру?')
                        ],
                        components: [
                            new ActionRowBuilder()
                                .addComponents(
                                    new ButtonBuilder()
                                        .setCustomId(`rps_exit`)
                                        .setLabel("Завершить")
                                        .setStyle(ButtonStyle.Danger),
                                )
                        ],
                        ephemeral: true
                    })
                    
                    
                }
                else i.deferUpdate()
                switch (move) {
                    case 'rock':
                        userMove = "✊";
                        break;
                    case 'paper':
                        userMove = "🤚";
                        break;
                    case 'scissors':
                        userMove = "✌️";
                        break;
                }
                switch (move) { // Calculating if player wins, losses, or a tie
                    case 'rock':
                        win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2); break;
                    case 'paper':
                        win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0); break;
                    case 'scissors':
                        win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1); break;
                }

                if(win == 2)    ++coutWin;

                return interaction.editReply({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Я выбрал ${botMove.txtru}! ${win == 0 ? 'Ты проиграл!' : (win == 1 ? 'У нас ничья!' : 'Ты выиграл!')} (${userMove} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji}) \nМы можем продолжить играть, если ты конечно хочешь`)
                            .setColor('White')
                    ]
                });
            }
            }
        });

        collector.on('end', async collected => {
            return await interaction.editReply({
                attachments: [],
                embeds: [
                    new EmbedBuilder()
                    .setTitle("Игра окончена")
                    .setDescription(`Мне надо бежать, если хочешь поиграть ещё, то просто повтори команду`)
                    .setColor('Red')
                ],
                components: []
            });
        });
    }
};