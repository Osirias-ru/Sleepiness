const { EmbedBuilder, AttachmentBuilder } = require("discord.js");

module.exports = {
    id: "createembed",
    run: async (client, interaction, config, db) => {
        interaction.deferReply({ ephemeral: true })
                .then(() => {
                    const 	title = interaction.fields.getTextInputValue('title') ?? ``, 
                            description = interaction.fields.getTextInputValue('description') ?? ``,
                            color = interaction.fields.getTextInputValue('color') ?? ``,
                            image = interaction.fields.getTextInputValue('image') ?? ``,
                            thumbnail = interaction.fields.getTextInputValue('thumbnail')?? ``;
                    let embed = new EmbedBuilder();
                    if (title.length > 0) embed.setTitle(title);
                    if (description.length > 0) embed.setDescription(description);
                    const reg = /^#([0-9a-f]{3}){1,2}$/i;
                    if (reg.test(color)) {
                        embed.setColor(color);
                    } else {
                        embed.setColor('#FFFFFF');
                    }
                    let files = [];
                    if (image.match(/^http[^\?]*.(gif)(\?(.*))?$/gmi) !== null) {
                        files.push(new AttachmentBuilder(image, {name : 'file.gif'}));
                        embed.setImage('attachment://file.gif')
                    }
                    if (image.match(/^http[^\?]*.(gif)(\?(.*))?$/gmi) !== null) {
                        files.push(new AttachmentBuilder(image, {name : 'file.gif'}));
                        embed.setImage('attachment://file.gif')
                    }
                    if (thumbnail.match(/^http[^\?]*.(jpg|jpeg|png|tiff|bmp)(\?(.*))?$/gmi) !== null) {
                        files.push(new AttachmentBuilder(thumbnail, {name : 'file2.png'}));
                        embed.setThumbnail('attachment://file2.png')
                    }
                    interaction.channel.send({
                        embeds: [embed],
                        files: files
                    })
                    interaction.followUp({ content: `Опубликовано.`, ephemeral: true });
                });          
			return true;

    },
};
