const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "пожать", 
        description: "Пожми руку любому человеку на этом сервере!", 
        usage: "пожать [упоминание пользователя]" 
    },
    permissions: ['SendMessages'],
    owner: false, 
    run: async (client, message, args, prefix, config, db) => {

        const images = ["https://images-ext-2.discordapp.net/external/eMS8e43qjGSYC2wFj9ERBxklh8dvCRm3mXp02cCXR-U/https/i.gifer.com/9YFW.gif"];

        const user = client.users.cache.get(message.author.id);

        if(!args[0]) return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} пожал руку всем!`)
                      .setColor('Blue')
                      .setImage(`${images[Math.floor(Math.random() * images.length)]}`)
                ]
            }
        );
        
        const targetUser = client.users.cache.get(message.mentions.users.first().id);

        return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} пожал руку ${targetUser.username}!`)
                      .setColor('Blue')
                      .setImage(`${images[Math.floor(Math.random() * images.length)]}`)
                ]
            }
        );
    },
};