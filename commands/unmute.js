exports.run = (client, message, args, ops) => {
    const Discord = require('discord.js');
    if(!message.member.hasPermission('MANAGE_ROLES') || !message.member.hasPermission(["KICK_MEMBERS", "BAN_MEMBERS"]) || !message.guild.owner) return message.reply("Non hai il permesso di usare questo comando!");
	if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.reply("Non ho l'autorizzazione per gestire i ruoli!");
    let toUnmute = message.mentions.members.first();
    if(!toUnmute) return message.reply("Fornire un utente per smutarlo");
    let muteRole = message.guild.roles.cache.find(r => r.name === "Muto");
    const unmuteConfirm = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setDescription(`:aprovato: ${toUnmute.user.username} è stato smutato con successo!`);
    toUnmute.roles.remove(muteRole.id).then(() => {
        message.delete()
        toUnmute.send(`Sei stato rimutato **${message.guild.name}**`)
        console.log(`${toUnmute.user.username} è stato rimutato in ${message.guild.name}`)
        message.channel.send(unmuteConfirm)
    });
}