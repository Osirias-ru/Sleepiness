const { EmbedBuilder, PermissionsBitField, codeBlock } = require("discord.js");
const client = require("../../index");
const config = require("../../config/config.js");
const { QuickDB } = require("quick.db");
let xp = require('simply-xp')
const db = new QuickDB();
const date = new Date();


module.exports = {
  name: "messageCreate"
};

client.on('messageCreate', async (message) => {
  if (message.channel.type !== 0) return;
  if (message.author.bot) return;
  const mention = message.mentions.users.first();
  let user = client.users.cache.get("1059158689627512962");// bot id
  const prefix = await db.get(`guild_prefix_${message.guild.id}`) || config.Prefix || "?";
  if (mention == user && message.content.startsWith(mention)) {
    return message.reply(
      {
        embeds: [
          new EmbedBuilder()
              .setThumbnail(mention.displayAvatarURL(
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
                    value: `Добавлена игра крестики-нолики. Можно поиграть в неё по команде \`${prefix}крестики-нолики\` или \`/крестики-нолики\``,
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
  }
  if (!message.guild) return;

  if (!message.content.startsWith(prefix)) return (date.getDay() == 6) ? xp.addXP(message, message.author.id, message.guild.id, {
    min: 7,
    max: 18
  }) :  xp.addXP(message, message.author.id, message.guild.id, {
    min: 7,
    max: 13
  })

  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();
  if (cmd.length == 0) return;

  let command = client.prefix_commands.get(cmd);

  if (!command) return (date.getDay() == 6) ? xp.addXP(message, message.author.id, message.guild.id, {
      min: 7,
      max: 18
    }) :  xp.addXP(message, message.author.id, message.guild.id, {
      min: 7,
      max: 13
    })
;
  if (command) {
    if (command.permissions) {
      if (!message.member.permissions.has(PermissionsBitField.resolve(command.permissions || []))) return message.reply({
        embeds: [
          new EmbedBuilder()
            .setDescription(`🚫 Как бы вам не хотелось, я не могу дать использовать вам эту команду, поскольку у вас недостаточно прав.`)
            .setColor("Red")
        ]
      })
    };

    if (command.owner, command.owner == true) {
      if (config.Users?.OWNERS) {
        const allowedUsers = [];

        config.Users.OWNERS.forEach(user => {
         const fetchedUser = message.guild.members.cache.get(user);
          if (!fetchedUser) return allowedUsers.push('*Unknown User#0000*');
          allowedUsers.push(`${fetchedUser.user.tag}`);
        })

        if (!config.Users.OWNERS.some(ID => message.member.id.includes(ID))) return message.reply({
          embeds: [
            new EmbedBuilder()
              .setDescription(`🚫 Эта команда закрыта для использования! Все вопросы к:\n**${allowedUsers.join(", ")}**`)
              .setColor("Red")
          ]
        })
      }
    };

    try {
      command.run(client, message, args, prefix, config, db);
    } catch (error) {
      console.error(error);
    };
  }
});
