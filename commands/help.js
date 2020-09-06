const prefix = process.env.PREFIX;
const Discord = require('discord.js');

exports.run = (client, message, args, ops) => {
  helpMsg = new Discord.MessageEmbed()
  .setTitle(client.user.username)
  .setDescription("**Tutti i comandi disponibili per il bot** **" + client.user.username + "**")
  .addField("➥ Moderazione (6)",
   "`clear` `ban` `kick` `nick` `mute` `unmute`")
  .addField("➥ Informazioni (?)",
   "`help` `invite` `mcstatus` `mcskin` `skin` `8ball` `meme` `mcleaks` `ping`")
  .addField("➥ Divertenti (?)",
   "`covid19` `say`")
  .setColor('00adff')
  message.channel.send(helpMsg);
}