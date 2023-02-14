const { Client, IntentsBitField, Partials } = require('discord.js')
const CH = require('command-handler')
const path = require('path')
require('dotenv/config')

const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.MessageContent,
  ],
  partials: [Partials.Channel],
})

client.on('ready', () => {
  console.log('The bot is ready!')

  new CH({
    client,
    mongoUri: process.env.MONGO_URI,
    commandsDir: path.join(__dirname, 'commands'),
    featuresDir: path.join(__dirname, 'features'),
    testServers: ['879296318395277352', '889564838710366248'],
    botOwners: ['879296318395277352'],
    cooldownConfig: {
      errorMessage: 'Please wait {TIME}',
      botOwnersBypass: false,
      dbRequired: 300, // 5 minutes
    },
    events: {
      dir: path.join(__dirname, 'events'),
    },
    validations: {
      runtime: path.join(__dirname, 'validations', 'runtime'),
      syntax: path.join(__dirname, 'validations', 'syntax'),
    },
  })
})

client.login(process.env.TOKEN)
