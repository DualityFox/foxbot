const Discord = require("discord.js")
const parseDuration = require("parse-duration"),
    humanizeDuration = require("humanize-duration")


module.exports = {
    run: async (message, args) => {
        if (!message.member.hasPermission('ADMINISTRATOR')) return message.channel.send("Vous n'avez pas la permission ``Administrateur``")
        const member = message.mentions.members.first()
        if (!member) return message.channel.send('Veuillez mentionner le membre à mute.\nUtilisation : ``fb!tempmute [@mention] [durée] <raison>``')
        if (member.id === message.guild.ownerID) return message.channel.send('On ne mute pas le propriétaire du serveur voyons.')
        if (message.member.roles.highest.comparePositionTo(member.roles.highest) < 1 && message.author.id !== message.guild.ownerID) return message.channel.send('Vous ne pouvez pas mute ce membre.')
        if (!member.manageable) return message.channel.send("Mon rôle n'est pas assez élevé pour mute ce membre.")
        const duration = parseDuration(args[1])
        if(!duration) return message.channel.send("Merci de préciser une durée\nUtilisation : ``fb!tempmute [@mention] [durée] <raison>``")
        const reason = args.slice(2).join(' ') || 'Aucune raison fournie'
        let muteRole = message.guild.roles.cache.find(role => role.name === 'Muted by •|Fox Bot|•')
        if (!muteRole) {
            muteRole = await message.guild.roles.create({
                data: {
                    name: 'Muted by •|Fox Bot|•',
                    permissions: 0
                }
            })
            message.guild.channels.cache.forEach(channel => channel.createOverwrite(muteRole, {
                SEND_MESSAGES: false,
                CONNECT: false,
                ADD_REACTIONS: false
            }))
        }
        await member.roles.add(muteRole)
        message.channel.send( new Discord.MessageEmbed()
        .setTitle(`Mute de ${member.user.tag}`)
        .setColor('#ff6800')
        .addField('Raison :', `${reason}`,true)
        .addField('Durée', `${humanizeDuration(duration, {language: 'fr'})}`, true)
        .addField(`Muté par:`,`${message.author.username}`,true)
        )
        setTimeout(() => {
            if (member.deleted || !member.manageable) return
            member.roles.remove(muteRole)
            message.channel.send(`${member} à été unmute`)
        }, duration)
    },
    name: 'tempmute',
    guildOnly: true,
    help : {
        description: "Reduit au silence le membre mentionné pendant le temps donné",
        syntax: "[@mention] [durée] <raison>"
    }
}
