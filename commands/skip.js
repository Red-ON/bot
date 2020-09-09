exports.run = (client, message, args, ops) => {
  let fetched = ops.active.get(message.guild.id);
  if(!fetched) return message.reply("Non c'è musica nella tua coda.");
  if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Spiacenti, non sei connesso allo stesso canale");
  
  let userCount = message.member.voice.channel.members.size;
  let required = Math.ceil(userCount/2);
  
  fetched.queue[0].voteSkips.push(message.member.id);
  ops.active.set(message.guild.id, fetched);
  
  if(fetched.queue[0].voteSkips.length >= required) {
    message.channel.send("Canzone saltata con successo!");
    return fetched.dispatcher.emit('finire');
  }
  
  message.channel.send(`Canzone saltata con successo! ${fetched.queue[0].voteSkips.length}/${required} necessario`);
  
}