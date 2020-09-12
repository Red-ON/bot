exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply(":x: Non c'è musica nella tua coda.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply(":x: Spiacenti, non sei connesso allo stesso canale");
  
  if(fetched.dispatcher.paused) return message.reply(":x: La musica è già in pausa!");
  
  fetched.dispatcher.pause();
  message.reply(`:white_check_mark: Messa in pausa riuscita **${fetched.queue[0].songTitle}**`);
}