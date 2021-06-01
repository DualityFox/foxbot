const Discord = require("discord.js")
const fs = require("fs")
module.exports = {
    run: async (message, args, client) => {
        const reason = args.slice(1).join(" ")
        message.mentions.members.first().createDM().then(channel => {channel.send(`${reason}`)});
    },
    name: 'dm',
    guildOnly: true,
    help : {
        description: "!",
        syntax: "[@mention] [raison]"
    }
}
