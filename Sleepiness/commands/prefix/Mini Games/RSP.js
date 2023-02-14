const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, MessageCollector } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
    config: {
        name: "кнб",
        description: "Мини игра: камень/ножницы/бумага",
      },
      permissions: ['SendMessages'],
      owner: false,
    run: async (client, message, args, prefix) => {
        let coutGame = 0, coutWin = 0;
        let hand = [{ txtru: "камень", txt: 'Rock', emoji: '✊', index: 0 }, { txtru: "бумагу", txt: 'Paper', emoji: '🤚', index: 1 }, { txtru: "ножницы", txt: 'Scissors', emoji: '✌️', index: 2 }]; // Defining Moves
        let rpsMsg = await message.reply({
            embeds: [
                new EmbedBuilder() 
                    .setColor('White')
                    .setTitle('Камень/Ножницы/Бумага')
                    .setDescription('Выбери как сходить, я уже выбрал свой ход и не буду подсматривать!')
            ]
        }).then(async (rpsMsg) => {
            await rpsMsg.react('✊');
            await rpsMsg.react('✌️');
            await rpsMsg.react('🤚');
            await rpsMsg.react('🛑');;

            waitForReaction(rpsMsg);

        });

        async function waitForReaction(msg) {
        msg.awaitReactions({ filter: (reaction, user) => {
            return ['✊', '🤚', '✌️', '🛑'].includes(reaction.emoji.name) && user.id !== msg.author.id && user.id === message.author.id;
        }, max: 1, time: 120000, errors: ['time'] }).then(async collected => {
                ++ coutGame;
                const botMove = hand[Math.floor(Math.random() * 3)];
                const userMove = collected.first().emoji.name;
                const reaction = collected.first();
                let move;
                if(reaction.emoji.name === '🛑') {
                    move = 'close'
                } else if(reaction.emoji.name === '✊') {
                    move = 'rock'
                } else if(reaction.emoji.name === '🤚') {
                    move = 'paper'

                } else if(reaction.emoji.name === '✌️') {
                    move = 'scissors'
                }

                if(move == 'close') { 
                    const description = (coutWin % 10 > 1 && coutWin % 10 < 5) ? "раза" : "раз"
                    return await msg.edit({
                        embeds: [
                            new EmbedBuilder()
                            .setTitle("Игра окончена")
                            .setDescription(`Спасибо за игру!\nТы выиграл ${coutWin} ${description} из ${coutGame - 1} игр`)
                            .setColor('Red')
                        ],
                    }).then(async (msg) => {
                        msg.reactions.removeAll()
                    });
                } 

                switch (move) {
                    case 'rock':
                        win = botMove.index == 0 ? 1 : (botMove.index == 1 ? 0 : 2); break;
                    case 'paper':
                        win = botMove.index == 0 ? 2 : (botMove.index == 1 ? 1 : 0); break;
                    case 'scissors':
                        win = botMove.index == 0 ? 0 : (botMove.index == 1 ? 2 : 1); break;
                }
    
                if(win == 2) {
                    ++ coutWin;
                }

                await msg.edit({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Я выбрал ${botMove.txtru}! ${win == 0 ? 'Ты проиграл!' : (win == 1 ? 'У нас ничья!' : 'Ты выиграл!')} (${userMove} ${win == 0 ? '<' : (win == 1 ? '=' : '>')} ${botMove.emoji}) \nМы можем продолжить играть, если ты конечно хочешь`)
                            .setColor('White')
                    ]
                });

                reaction.users.remove(reaction.users.cache.filter(user => user.id !== msg.author.id && user.id === message.author.id).first().id)
                waitForReaction(msg);
            });
        }
    }
}