exports.run = (client, message, args, ops) => {
	let fetched = ops.active.get(message.guild.id);
	if(!fetched) return message.reply("Non c'è musica nella tua coda.");
	if(message.member.voice.channel !== message.guild.me.voice.channel) return message.reply("Spiacenti, non sei connesso allo stesso canale");

	if(isNaN(args[0]) || args[0] > 50 || args[0] < 0) return message.reply("Per favore, inserisci un numero compreso tra 0 e 50");

	fetched.dispatcher.setVolume(args[0]/100);
	message.reply(`Impostare correttamente il volume di **${fetched.queue[0].songTitle}** per **${args[0]}%**`);
}