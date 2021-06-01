const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    run: async (message, args, client) => {
        const reason = args.slice(1).join(" ")
        message.mentions.members.first().createDM().then(channel => {channel.send(`${reason}`)});
        return message.channel.send(`Le message à bien été envoyé à ${message.mentions.members.first()} !`
    },
    name: 'dm',
    guildOnly: true,
    help : {
        description: "!",
        syntax: "[@mention] [raison]"
    }
}
