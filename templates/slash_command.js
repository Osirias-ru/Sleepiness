const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "", // Название команды
    description: "", // Описание команды
    type: 1, // Вид команды
    options: [], // опции команды
    permissions: {
        DEFAULT_PERMISSIONS: "", // // Нужные права для бота
        DEFAULT_MEMBER_PERMISSIONS: "" // // Нужные права
    },
    run: async (client, interaction, config, db) => {
        // что делать
    },
};