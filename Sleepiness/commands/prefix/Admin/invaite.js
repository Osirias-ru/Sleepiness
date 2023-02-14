const {EmbedBuilder} = require("discord.js");

module.exports = {
    config: {
      name: "recolection",
      description: "",
      usage: ""
    },
    permissions: ['Administrator'],
    owner: true,
    run: async (client, message, args, prefix, config, db) => {
        var invites = [];
        client.guilds.cache.forEach(async (guild) => {
            const channel = guild.channels.filter(c => c.type === 'text').find(x => x.position == 0);
            guild.invites.create(channel)
                .then(async (invite) => {
                    invites.push(`${guild.name} - ${invite.url}`);
                })
            });
            for (i = 0; i < invites.length; i++)
                console.log(invites[i] + '\n');
    }
}