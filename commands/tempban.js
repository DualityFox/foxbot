const Discord = require("discord.js")
const parseDuration = require("parse-duration"),
    humanizeDuration = require("humanize-duration")

module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('BAN_MEMBERS')) return message.channel.send("Tu n'as pas la permission ``Bannir des membres``.")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send("Merci de mentionner le membre à bannir temporairement\nUtilisation : ``fb!tempban [@mention] [durée] <raison>``")
        if (member.id === message.guild.ownerID) return message.channel.send("On ne banni pas le propriétaire du serveur voyons !!!")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send("Vous ne pouvez pas exclure ce membre")
        if(!member.bannable) return message.channel.send("Mon rôle n'est pas assez élevé pour bannir temporairement ce membre !")
        const duration = parseDuration(args[1])
        if(!duration) return message.channel.send("Merci de préciser une durée\nUtilisation : ``fb!tempban [@mention] [durée] <raison>``")
        const reason = args.slice(2).join(" ") || 'Aucune raison fournie'
        await member.ban({reason})
        message.channel.send( new Discord.MessageEmbed()
        .setTitle(`Bannisement temporaire de ${member.user.tag}`)
        .setColor('#ff0000')
        .addField('Raison :', `${reason}`, true)
        .addField('Durée', `${humanizeDuration(duration, {language: 'fr'})}`, true)
        .addField(`Banni temporairement par:`,`${message.author.username}`, true)
        )
        setTimeout(() => {
            message.guild.members.unban(member)
            message.channel.send(`**${member.user.tag}** à été débanni.`)
        },duration)
    },
    name: 'tempban',
    guildOnly: true,
    help : {
        description: "Bannis le membre mentionné pendant le temps donné",
        syntax: "[@mention] [durée] <raison>"
    }
}
