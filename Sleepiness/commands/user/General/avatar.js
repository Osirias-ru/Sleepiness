const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: "Аватар",
    type: 2,
    run: async (client, interaction, config, db) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Finals:
        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Аватар ${user.user.tag}:`)
                        .setImage(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                ],
                ephemeral: true
            }
        );

    },
};
