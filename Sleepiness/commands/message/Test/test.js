const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "Тест",
    type: 3,
    run: async (client, interaction, config, db) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription('Тест')
            ],
            ephemeral: true
        })
    },
};
