const { EmbedBuilder } = require("discord.js"); 

module.exports = {
  config: {
    name: "пинг",
    description: "Понг!",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    message.reply({ embeds: [
      new EmbedBuilder()
        .setDescription(`🏓 **Понг!** Мой пинг: \`${client.ws.ping}\` мс.`)
        .setColor("White")
    ] })
  },
};
