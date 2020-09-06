exports.run = (client, message, args, ops) => {
	if(message.channel.type == 'DM') return message.reply('**È possibile utilizzare questo comando solo nei server!**');
	if(!message.member.hasPermission('KICK_MEMBERS')) return message.reply("Non hai il permesso di eseguire questo comando!");
	let mentionMember = message.mentions.members.first();
	if(!mentionMember) return message.reply("**Menziona l'utente che vuoi kickare!**");
	if(!mentionMember.kickable) return message.reply("Non ho il permesso di cacciare questo utente. Ha un ruolo più alto? Ho il permesso di prenderlo a calci?");
	try {
		mentionMember.kick()
	} catch (error) {
		message.reply("Non posso cacciare questo utente, ha un ruolo più alto? È il creatore del server? Ho il permesso di prenderlo a calci?");
	}
	const Discord = require('discord.js');
	const kickConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`:aprovato:  ${mentionMember} è stato kickato con successo!`);
	message.channel.send(kickConfirm);
}