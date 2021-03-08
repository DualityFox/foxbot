const Discord = require("discord.js")

module.exports = {
    run: async (message, args, client) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu n'as pas la permission ``Bannir des membres``.")
        let member = await client.users.fetch(args[0]);
        if (!member) return message.channel.send("L'utilisateur n'existe pas où plus");
        if (!member.ban) return message.channel.send("L'utilisateur n'est pas banni du serveur");
        message.guild.members.unban(member)
        message.channel.send(`**${member.username}** à été débanni`)
    },
    name: 'unban',
    guildOnly: true,
    help : {
        description: "Débanni l'utilisateur",
        syntax: "[Id de l'utilisateur]"
    }
}
