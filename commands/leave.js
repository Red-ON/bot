const ytdl = require("ytdl-core");

exports.run = async (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("Non c'è musica nella tua coda");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Spiacenti, non sei connesso allo stesso canale");
  let data = ops.active.get(message.guild.id) || {};
  let dispatcher = await data.connection.play(ytdl(data.queue[0].url, { type: 'opus' }));
  dispatcher.guildID = data.guildID;
  ops.active.delete(dispatcher.guildID);
  let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
  if (vc) vc.leave();
  message.guild.me.voice.channel.leave();
  message.reply(' ✔ Abbandonato con successo il canale vocale.');
}