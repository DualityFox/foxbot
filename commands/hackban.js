const Discord = require("discord.js")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.reply("tu n'as pas la permission ``Bannir des membres``.")
        const member = message.guild.members.cache.get(args[0])
        if (!member) return message.reply("merci de donner l'ID du membre à bannir\nUtilisation : ``fb!ban [id] <raison>``")
        if (member.id === message.guild.ownerID) return message.reply("On ne banni pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.reply("Vous ne pouvez pas bannir ce membre")
        if(!member.bannable) return message.reply("Mon rôle n'est pas assez élevé pour bannir ce membre !")
        const reason = args.slice(1).join(" ") || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send( new Discord.MessageEmbed()
        .setTitle(`Bannisement de ${member.user.tag}`)
        .setColor('#ff0000')
        .addField('Raison :', `${reason}`, true)
        .addField(`Banni par :`, `${message.author.username}`, true)
        )
    },
    name: 'hackban',
    guildOnly: true,
    help : {
        description: "Banni l'utilisateur via son ID",
        syntax: "[id] <raison>"
    }
}
