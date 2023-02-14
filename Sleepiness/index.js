const { Client, Partials, Collection, GatewayIntentBits } = require('discord.js');
const config = require('./config/config');
const colors = require("colors");
let xp = require('simply-xp');
const mongo = process.env.MONGO || config.Handlers.MONGO;

// Creating a new client:
const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildPresences,
    GatewayIntentBits.GuildMessageReactions,
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.MessageContent
  ],
  partials: [
    Partials.Channel,
    Partials.Message,
    Partials.User,
    Partials.GuildMember,
    Partials.Reaction
  ],
  presence: {
    activities: [{
      name: "!инфо",
      type: 0
    }],
    status: 'online'
  }
});

// Host the bot:
require('http').createServer((req, res) => res.end('Ready.')).listen(3000);

// Getting the bot token:
const AuthenticationToken = process.env.TOKEN || config.Client.TOKEN;
if (!AuthenticationToken) {
  console.warn("[CRASH] Токен авторизации discord не найден.".red)
  return process.exit();
};

// Handler:
client.prefix_commands = new Collection();
client.slash_commands = new Collection();
client.user_commands = new Collection();
client.message_commands = new Collection();
client.modals = new Collection();
client.events = new Collection();

module.exports = client;

["prefix", "application_commands", "modals", "events", "mongoose"].forEach((file) => {
  require(`./handlers/${file}`)(client, config);
});

xp.connect(mongo, {
  notify: true,
})

client.on("ready", () => {
  const Guilds = client.guilds.cache.map(guild => guild.name);
  console.log(Guilds);
});

// Login to the bot:
client.login(AuthenticationToken)
  .catch((err) => {
    console.error("[CRASH] Ошибка подключения к боту...");
    console.error("[CRASH] Ошибка с дискорд API:" + err);
    return process.exit();
  });

// Handle errors:
process.on('unhandledRejection', async (err, promise) => {
  console.error(`[ANTI-CRASH] Необработанная ошибка: ${err}`.red);
  console.error(promise);
});
