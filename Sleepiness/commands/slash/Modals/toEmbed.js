const { EmbedBuilder, ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder } = require("discord.js");

module.exports = {
    name: "эмбед",
    description: "Опубликовать эмбед!",
    type: 1,
    permissions: {
        DEFAULT_MEMBER_PERMISSIONS: "SendMessages"
    },
    run: async (client, interaction, config, db) => {
        const modal = new ModalBuilder()
            .setCustomId('createembed')
            .setTitle('Опубликуй эмбед!');
        const title = new TextInputBuilder()
                .setCustomId('title')
                .setLabel("Заголовок")
                .setStyle(TextInputStyle.Short)
                .setRequired(false);

        const description = new TextInputBuilder()
                .setCustomId('description')
                .setLabel("Описание")
                .setStyle(TextInputStyle.Paragraph)
                .setMaxLength(2000)
                .setRequired(false);

        const image = new TextInputBuilder()
                .setCustomId('image')
                .setLabel("Картинка")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Ссылка на картинку')
                .setRequired(false);

        const thumbnail = new TextInputBuilder()
                .setCustomId('thumbnail')
                .setLabel("Маленькая картинка")
                .setStyle(TextInputStyle.Short)
                .setPlaceholder('Ссылка на картинку')
                .setRequired(false);

        const color = new TextInputBuilder()
                .setCustomId('color')
                .setLabel("Цвет в HEX формате")
                .setStyle(TextInputStyle.Short)
                .setRequired(false)
                .setPlaceholder('#FFFFFF');
        
        const firstActionRow = new ActionRowBuilder().addComponents(title);
        const secondActionRow = new ActionRowBuilder().addComponents(description);
        const thirdActionRow = new ActionRowBuilder().addComponents(image);
        const fourthActionRow = new ActionRowBuilder().addComponents(color);
        const fiveActionRow = new ActionRowBuilder().addComponents(thumbnail);

        modal.addComponents(firstActionRow, secondActionRow, thirdActionRow, fourthActionRow, fiveActionRow);

        await interaction.showModal(modal);
    },
};
