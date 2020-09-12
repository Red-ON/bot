exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("Non c'è musica nella tua coda.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Spiacenti, non sei connesso allo stesso canale");
  
  if(!fetched.dispatcher.paused) return message.reply("La musica non è in pausa!");
  
  fetched.dispatcher.resume();
  message.reply(`✔ Ripresa con successo **${fetched.queue[0].songTitle}**`);
}