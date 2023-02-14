const { EmbedBuilder } = require("discord.js");

module.exports = {
  config: {
    name: "преф",
    description: "Устанавливает новый префикс.",
    usage: "преф [новый префикс]"
  },
  permissions: ['Administrator'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    if (!args[0]) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Ошибка")
        .setDescription("Укажите новый префикс!")
        .setColor("Red")
    ]});

    if (args[0] == '/') return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Ошибка")
        .setDescription("Префикс не может быть \'/\'!")
        .setColor("Red")
    ]});

    if (args[0].length > 5) return message.reply({ embeds: [
      new EmbedBuilder()
        .setTitle("Ошибка")
        .setDescription("Префикс не может содержать в себе более 5 символов!")
        .setColor("Red")
    ]});

    const newPrefix = await db.set(`guild_prefix_${message.guild.id}`, args[0]);

    const finalEmbed = new EmbedBuilder()
      .setTitle("Успешно!")
      .setDescription(`Новый префикс: \`${newPrefix}\`.`)
      .setColor("Green");

    return message.reply({ embeds: [finalEmbed] });
    
  },
};
