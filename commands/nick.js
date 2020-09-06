exports.run = (client, message, args, ops) => {
	if(message.channel.type == 'DM') return message.reply('È possibile utilizzare questo comando solo nei server');
	if (!message.guild.me.hasPermission('MANAGE_NICKNAMES')) return message.channel.send('Non ho il permesso di cambiare i nickname!');
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Non hai il permesso di eseguire questo comando!");
	let mentionMember = message.mentions.members.first();
	let newNickname = args.slice(1).join(' ');
	if(!mentionMember) return message.reply("Indica l'utente a cui vuoi cambiare il nickname");
	if(!newNickname) return message.reply("Inserisci il nuovo nickname per l'utente che hai menzionato");
	if(!mentionMember.kickable) return message.reply("Non è possibile modificare il nickname di questo utente, ha un ruolo più alto? È il creatore del server? Ho il permesso di cambiare il suo soprannome?");
	try {
		mentionMember.setNickname(newNickname);
	} catch (error) {
		message.reply("Non posso cambiare il nickname di questo utente, ha un ruolo più alto? È il creatore del server? Ho il permesso di cambiare il suo nickname?");
	}
	message.reply(`:aprovato: Nickname cambiato di ${mentionMember} per **${newNickname}**`);
}