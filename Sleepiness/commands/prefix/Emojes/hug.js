const { EmbedBuilder } = require('discord.js');

module.exports = {
    config: {
        name: "обнять", 
        description: "Обними любого человека на этом сервере!", 
        usage: "обнять [упоминание пользователя]" 
    },
    permissions: ['SendMessages'],
    owner: false, 
    run: async (client, message, args, prefix, config, db) => {

        const user = client.users.cache.get(message.author.id);

        if(!args[0]) return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} обнял всех!`)
                      .setColor('Blue')
                ]
            }
        );
        
        const targetUser = client.users.cache.get(message.mentions.users.first().id);

        return message.reply(
            {
                embeds: [
                  new EmbedBuilder()
                      .setTitle(`${user.username} обнял ${targetUser.username}!`)
                      .setColor('Blue')
                ]
            }
        );
    },
};