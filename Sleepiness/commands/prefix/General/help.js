const { EmbedBuilder, codeBlock } = require("discord.js");

module.exports = {
  config: {
    name: "хелп",
    description: "Даёт информация о команде.",
    usage: "хелп [команда]",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix, config, db) => {

    const commands = client.prefix_commands.map(command => `${prefix}${command.config.name}`);

    if (!args[0]) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor(
            {
              name: client.user.tag,
              iconURL: client.user.displayAvatarURL(
                {
                  dynamic: true
                }
              )
            }
          )
          .setTitle("Вот все мои команды")
          .setDescription(commands.join(', '))
          .setFooter({text: `Используй ${prefix}хелп [команда] для получения продробной информации о нужной команде`})
          .setColor('White')
      ]
    });

    const command = client.prefix_commands.get(args[0].toLowerCase());
  
    if (!command) return message.reply({
      embeds: [
        new EmbedBuilder()
          .setAuthor(
            {
              name: client.user.tag,
              iconURL: client.user.displayAvatarURL(
                {
                  dynamic: true
                }
              )
            }
          )
          .setTitle(`Я не нашёл эту команду в моём реестре команд, посмотри какие команды у меня есть.`)
          .setDescription(commands.join(', '))
          .setColor('White')
      ]
  });

    return message.reply({
      embeds: [
        new EmbedBuilder()
          .setTitle(`Информация о команде: ${command.config.name.toUpperCase()}`)
          .addFields(
            { name: 'Описание:', value: command.config.description || "У этой команды нет описания." },
            { name: 'Использование:', value: command.config.usage ? codeBlock('txt', prefix + command.config.usage) : "Для использования не требуюся доп. аргументы." },
            { name: 'Права для использования:', value: command.permissions.join(", ") }
            //{ name: 'Developer only?', value: command.owner ? 'Yes' : 'No' }
          )
          .setColor("White")
      ]
    });
    
  },
};