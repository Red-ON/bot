exports.run = async (client, message, args, ops) => {
	const Discord = require('discord.js');
	if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission || !message.guild.owner) return message.reply("Non hai il permesso di usare questo comando!");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("Non ho l'autorizzazione per gestire i ruoli!");
	let toMute = message.mentions.members.first();
	if(!toMute) return message.reply("Fornisci un utente da mutare!");
	let reason = args.slice(1).join(" ");
	if(!reason) reason = "Nessun motivo fornito";
	let muteRole = message.guild.roles.cache.find(r => r.name === "Muto");
	if(!muteRole) {
		try {
			muteRole = await message.guild.roles.create({
				data: {
					name: "Muto",
					color: "#514f48",
					permissions: []
				}
			});
		} catch (e) {
			console.log(e.stack);
		}
	}
	message.guild.channels.cache.forEach((channel) => {
		channel.updateOverwrite(muteRole, {
			"SEND_MESSAGES": false,
			"ATTACH_FILES": false,
			"SEND_TTS_MESSAGES": false,
			"ADD_REACTIONS": false,
			"SPEAK": false,
			"STREAM": false
		});
	});
	const muteConfirm = new Discord.MessageEmbed()
	.setColor('#0099ff')
	.setDescription(`✔ ${toMute.user.username} è stato mutato con successo!\nReason: __${reason}__`);
	toMute.roles.add(muteRole.id).then(() => {
		message.delete()
		toMute.send(`Sei stato mutato! **${message.guild.name}** per: **${reason}**`)
		console.log(`${toMute.user.username} è stato mutato ${message.guild.name} per: ${reason}`)
		message.channel.send(muteConfirm)
	});
}