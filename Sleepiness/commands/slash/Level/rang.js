const { EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
let xp = require("simply-xp");

module.exports = {
    name: "ранг",
    description: "Получить свой ранг",
    type: 1,
    options: [
        {
            type: 6, name: 'пользователь', description: 'Пользователь, чей ранг вы хотете узнать.', required: false
        }
    ],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages" 
    },
    run: async (client, interaction, config, db) => {
        await interaction.deferReply();
        const member = interaction.options.getMember("пользователь") ?? interaction.member;
        if(member.user.bot) return  await interaction.followUp({
                    embeds: [
                        new EmbedBuilder()
                            .setDescription(`Я не могу получить уровень бота!`)
                            .setColor(`Red`)
                            
                    ], ephemeral: true
        });
        xp.rank(interaction, member.id, interaction.guild.id, {
        background: 'https://static.insales-cdn.com/images/products/1/7141/403553253/80%D1%8580_%D1%81%D0%B2%D0%B5%D1%82%D0%BB%D0%BE_%D1%81%D0%B5%D1%80%D1%8B%D0%B9_-_%D0%BE%D1%8429.jpg', // Default: Rainbow
        color: "#096DD1", // Default: #096DD1
        lvlbar: "#f2f2f2", // Default: #ffffff
        lvlbarBg: "#2a2a2a" // Default: #ffffff
        }).then(async (img) => {
            await interaction.followUp({ files: [img]});
        });
    },
};