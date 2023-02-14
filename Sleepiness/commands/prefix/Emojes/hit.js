const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "ударить", 
        description: "Ударь любого человека на этом сервере!", 
        usage: "ударить [упоминание пользователя]" 
    },
    permissions: ['SendMessages'],
    owner: false, 
    run: async (client, message, args, prefix, config, db) => {

        const user = client.users.cache.get(message.author.id);

        if(!args[0]) return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} ударил всех!`)
                      .setColor('Blue')
                ]
            }
        );
        
        const targetUser = client.users.cache.get(message.mentions.users.first().id);

        return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} ударил ${targetUser.username}!`)
                      .setColor('Blue')
                ]
            }
        );
    },
};