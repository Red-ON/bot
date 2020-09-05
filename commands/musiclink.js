exports.run = (client, message, args, ops) => {
    let fetched = ops.active.get(message.guild.id);
    if(!fetched) return message.reply("Non c'è musica nella tua coda.");
    let nowPlaying = fetched.queue[0];
    message.reply(`**${nowPlaying.songTitle}**\n${nowPlaying.url}`);
}