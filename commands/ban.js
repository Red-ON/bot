exports.run = (client, message, args, ops) => {
	if(message.channel.type == 'DM') return message.reply('È possibile utilizzare questo comando solo nei server!');
	var user = message.mentions.users.first();
	const banReason = args.slice(1).join(' ');
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Non hai il permesso di eseguire questo comando!");
	if(!user) {
		try {
			if (!message.guild.members.get(args.slice(0, 1).join(' '))) throw new Error('Impossibile ottenere un utente Discord con questo ID utente!');
			user = message.guild.members.get(args.slice(0, 1).join(' '));
			user = user.user;
		} catch (error) {
			return message.reply('Impossibile ottenere un utente Discord con questo ID utente!');
		}
	}
	if (user === message.author) return message.channel.send('Non puoi autobannarti!');
	if (!banReason) return message.reply('Hai dimenticato di inserire un motivo per questo BAN!');
	message.guild.members.ban(user, { reason: banReason });
	const Discord = require('discord.js');
	const banConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✔ ${user.tag} è stato bannato con successo!\nReason: __${banReason}__`);
	message.channel.send(banConfirm);
}