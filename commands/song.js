const prefix = process.env.PREFIX;
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
  helpMsg = new Discord.MessageEmbed()
  .setTitle(client.user.username)
  .setDescription("Tutti i comandi per la musica del bot **" + client.user.username + "**")
  .addField("🔊 Music", "`play`, `leave`, `pause`, `resume`, `search`, `skip`, `musiclink`, `volume`")
  .setColor('00e3ff')
  message.channel.send(helpMsg);
}
