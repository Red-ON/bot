exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("Non c'è musica nella tua coda.");
  
  let queue = fetched.queue;
  let nowPlaying = queue[0];
  
  let resp = `Ora in riproduzione:\n**${nowPlaying.songTitle}** | Richiesto da **${nowPlaying.requester}**\n\n__**Coda**__\n`;
  for(var i = 1; i < queue.length; i++) {
    resp += `${i}. **${queue[i].songTitle}** | Richiesto da **${queue[i].requester}**\n`;
  }
  
  message.channel.send(resp);
}