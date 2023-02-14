const { EmbedBuilder} = require("discord.js"); 

module.exports = {
  config: {
    name: "инфо",
    description: "Информация о боте.",
  },
  permissions: ['SendMessages'],
  owner: false,
  run: async (client, message, args, prefix) => {
    const commands = client.prefix_commands.map(command => `${prefix}${command.config.name}`);
    let user = client.users.cache.get("1059158689627512962");
    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
              .setThumbnail(user.displayAvatarURL(
                  {
                      dynamic: true
                  }
              ))
              .addFields(
                  {
                      name: "Sleepiness",
                      value: `\nПривет! Меня зовут Слиппи! Пока что я нахожусь на стадии разработки, но в будущем (я надеюсь) стану одним из крутых ботов, ну или просто пректом в портфолио моего разработчика .\n\nМой префикс сейчас \`${prefix}\`. Взгляни на команду \`${prefix}хелп\` для просмотра всех моих команд`,
                      inline: true
                  },
                  {
                      name: "Мой разработчик:",
                      value: `OSIRIAS#8211`,
                      inline: false
                  },
                  {
                      name: "Текущий пинг:",
                      value: `\`${client.ws.ping}\` мс.`,
                      inline: true
                  },
                  {
                    name: "Что нового:",
                    value: `Добавлена игра крестики-нолики. Можно поиграть в неё по команде \`${prefix}крестики-нолики\` или \`/крестики-нолики\`}`,
                    inline: true
                  },
                  {
                    name: "Сборка:",
                    value: `\`0.4.23\``,
                    inline: true
                  }
              )
              .setColor('White')
          ]
      } 
    );

  },
};