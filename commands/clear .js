exports.run = async (client, message, args, ops) => {
	if (!args[0]) return message.reply('**Non hai fornito una quantità di messaggi che dovrebbe essere eliminata!. PS +clear + numero da selezionare**');
    if (isNaN(args[0])) return message.reply("Il parametro amount non è un numero!");
    if (args[0] > 100) return message.reply("Non puoi eliminare più di 100 messaggi contemporaneamente!");
    if (args[0] < 1) return message.reply('Devi eliminare almeno 1 messaggio!');

    if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("Non hai il permesso di eseguire questo comando!");
    
    await message.channel.messages.fetch({ limit: args[99] }).then(messages => {
        message.channel.bulkDelete(messages)
    });
}