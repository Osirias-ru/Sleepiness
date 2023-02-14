const { EmbedBuilder } = require("discord.js");

module.exports = {
    name: "пинг",
    description: "Понг!",
    type: 1,
    options: [],
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        return interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setDescription(`🏓 **Понг!** Мой пинг: \`${client.ws.ping}\` мс.`)
                    .setColor('White')
            ],
            ephemeral: true
        })
    },
};
