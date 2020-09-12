const prefix = process.env.PREFIX;
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
  helpMsg = new Discord.MessageEmbed()
  .setTitle(client.user.username)
  .setDescription("**Tutti i comandi disponibili per il bot** **" + client.user.username + "**")
  .addField("➥ Musica",
   "`play`, `leave`, `pause`, `resume`, `search`, `skip`, `musiclink`, `volume`")
  .setColor('00adff')
  message.channel.send(helpMsg);
}