const Discord = require("discord.js")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu n'as pas la permission ``Bannir des membres``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre à bannir\nUtilisation : ``fb!ban [@mention] <raison>``")
        if (member.id === message.guild.ownerID) return message.channel.send("On ne banni pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas bannir ce membre")
        if(!member.bannable) return message.channel.send("Mon rôle n'est pas assez élevé pour bannir ce membre !")
        const reason = args.slice(1).join(" ") || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send( new Discord.MessageEmbed()
        .setTitle(`Bannisement de ${member.user.tag}`)
        .setColor('#ff0000')
        .addField('Raison :', `${reason}`, true)
        .addField(`Banni par :`, `${message.author.username}`, true)
        )
    },
    name: 'ban',
    guildOnly: true,
    help : {
        description: "Banni l'utilisateur mentionné",
        syntax: "[@mention] <raison>"
    }
}
