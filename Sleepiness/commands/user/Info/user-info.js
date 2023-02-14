const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const moment = require('moment');

module.exports = {
    name: "Информация о пользователе",
    type: 2,
    run: async (client, interaction, config, db) => {

        const user = interaction.guild.members.cache.get(interaction.targetId);

        // Joined server/discord handler:
        const joinedAgoCalculator = {
            fetch: {
                user(userInput, type) {
                    if (!userInput) throw new ReferenceError('You didn\'t provided the user to calculate.');

                    if (type === "discord") {
                        const joinedDiscordTimestampInNumber = new Date().getTime() - userInput.createdTimestamp;
                        const joinedDiscordTimestampInString = moment(userInput.user.createdAt).fromNow();

                        return joinedDiscordTimestampInString.toString(); // Just making sure it's string.
                    } else if (type === "server") {
                        const joinedServerTimestampInNumber = new Date().getTime() - userInput.joinedTimestamp;
                        const joinedServerTimestampInString = moment(userInput.joinedAt).fromNow();

                        return joinedServerTimestampInString.toString(); // Just making sure it's string.
                    } else throw new ReferenceError('Invalid type. Use "discord" or "server" only.');
                }
            }
        };

        // Bot type handler:
        const bot = {
            true: "Да",
            false: "Нет"
        };

        // Acknowledgements handler:
        // L for Dyno developers
        const acknowledgements = {
            fetch: {
                user(userInput) {
                    let result;

                    try {
                        if (userInput.permissions.has(PermissionsBitField.ViewChannel)) result = "Участник";
                        if (userInput.permissions.has(PermissionsBitField.KickMembers)) result = "Модератор";
                        if (userInput.permissions.has(PermissionsBitField.ManageServer)) result = "Менеджер";
                        if (userInput.permissions.has(PermissionsBitField.Administrator)) result = "Администратор";
                        if (userInput.id === interaction.guild.ownerId) result = "Создатель";

                    } catch (e) {
                        result = "Участник";
                    };

                    return result;
                }
            }
        };

        // Finals:
        return interaction.reply(
            {
                embeds: [
                    new EmbedBuilder()
                        .setTitle(`Информация о ${user.user.tag}:`)
                        .setThumbnail(user.displayAvatarURL(
                            {
                                dynamic: true
                            }
                        ))
                        .addFields(
                            {
                                name: "Тэг",
                                value: `${user.user.tag}`,
                                inline: true
                            },
                            {
                                name: "ID",
                                value: `\`${user.id}\``,
                                inline: true
                            },
                            {
                                name: `Роли [${user.roles.cache.size - 1}]`, // Use "-1" because we removed the "@everyone" role 
                                value: `${user.roles.cache.map((ROLE) => ROLE).join(' ').replace('@everyone', '') || "[No Roles]"}`,
                                inline: true
                            },
                            {
                                name: "Присоединился к серверу",
                                value: `${new Date(user.joinedTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "server")})`,
                                inline: true
                            },
                            {
                                name: "Залогинился в дискорде",
                                value: `${new Date(user.user.createdTimestamp).toLocaleString()}\n(${joinedAgoCalculator.fetch.user(user, "discord")})`,
                                inline: true
                            },
                            {
                                name: "Это бот?",
                                value: `${bot[user.user.bot]}`,
                                inline: true
                            },
                            {
                                name: "Иерархия",
                                value: `${acknowledgements.fetch.user(user)}`
                            }
                        )
                        .setColor('White')
                ],
                ephemeral: true
            }
        );

    },
};
