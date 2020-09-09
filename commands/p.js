const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voice.channel) return message.reply("Devi prima essere in un canale vocale!");

    if (!args[0]) return message.reply("Si prega di cercare o inserire un URL seguendo il comando!");

    let validate = await ytdl.validateURL(args[0]);
    if (!validate) {
      let commandFile = require("./search.js");
      return commandFile.run(client, message, args, ops);
    };

    let info = await ytdl.getInfo(args[0]);
  
    let data = ops.active.get(message.guild.id) || {};
    
    if(!data.connection) data.connection = await message.member.voice.channel.join();
    if(!data.queue) data.queue = [];
    data.guildID = message.guild.id;
    data.queue.push({
      songTitle: info.title,
      requester: message.author.tag,
      url: args[0],
      announceChannel: message.channel.id
    });
    if(!data.dispatcher) play(client, ops, data);
    else {
      message.channel.send(`Aggiunto alla coda: **${info.title}** | Richiesto da **<@${message.author.id}>**`);
    }
    ops.active.set(message.guild.id, data);
    

}

async function play(client, ops, data) {
  client.channels.cache.get(data.queue[0].announceChannel).send(`In riproduzione **${data.queue[0].songTitle}** | Richiesto da ${data.queue[0].requester}`);
  
  data.dispatcher = await data.connection.play(ytdl(data.queue[0].url, { type: 'opus' }));
  data.dispatcher.setVolume(100/100);
  data.dispatcher.guildID = data.guildID;
  
  data.dispatcher.once('finish', function() {
    finish(client, ops, this);
  });
  
}

function finish(client, ops, dispatcher) {
  let fetched = ops.active.get(dispatcher.guildID);
  fetched.queue.shift();
  
  if(fetched.queue.length > 0) {
    ops.active.set(dispatcher.guildID, fetched);
    play(client, ops, fetched);
  } else {
    ops.active.delete(dispatcher.guildID);
    let vc = client.guilds.cache.get(dispatcher.guildID).me.voice.channel;
    if (vc) vc.leave();
  }
}