const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
let xp = require("simply-xp");

module.exports = {
    config: {
        name: "ранг",
        description: "Получить свой ранг",
      },
      permissions: ['SendMessages'],
      owner: false,
    run: async (client, message, args, prefix, config, db) => {

        const member = message.mentions.users.first() ?? message.author;
        if(member.bot) return  await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Я не могу получить уровень бота!`)
                            .setColor(`Red`)
                            
                    ], ephemeral: true
        });
        xp.rank(message, member.id, message.guild.id, {
        background: 'https://static.insales-cdn.com/images/products/1/7141/403553253/80%D1%8580_%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D0%BE_%D1%81%D0%B5%D1%80%D1%8B%D0%B9_-_%D0%BE%D1%8429.jpg', // Default: Rainbow
        color: "#096DD1", // Default: #096DD1
        lvlbar: "#f2f2f2", // Default: #ffffff
        lvlbarBg: "#2a2a2a" // Default: #ffffff
        }).then(async (img) => {
            await message.reply({ files: [img]});
        });
    },
};