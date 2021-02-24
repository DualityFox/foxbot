const Discord = require("discord.js")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send("Tu n'as pas la permission ``Expulser des membres``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre à exclure\nUtilisation : ``db/kick @mention <raison>``")
        if (member.id === message.guild.ownerID) return message.channel.send("On n'exclu pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas exclure ce membre")
        if(!member.kickable) return message.channel.send("Mon rôle n'est pas assez élevé pour exclure ce membre !")
        const reason = args.slice(1).join(" ") || 'Aucune raison fournie'
        await member.kick(reason)
        message.channel.send( new Discord.MessageEmbed()
        .setTitle(`Expulsion de ${member.user.tag}`)
        .setColor('#ff6800')
        .addField('Raison :', `${reason}`, true)
        .addField(`Expulsé par:`,`${message.author.username}`, true)
        )
    },
    name: 'kick',
    guildOnly: true,
    help : {
        description: "Expulse le membre mentionné",
        syntax: "[@mention] <raison>"
    }
}