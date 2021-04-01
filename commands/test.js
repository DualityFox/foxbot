const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    run: (message, args, client) => {
        message.delete();
 
        let message = args.slice(1).join(" ");
        if(!message) return message.channel.send(`Erreur`)
     
     
        message.channel.send(`${message}`)
    },
    name: 'test',
    guildOnly: true,
    help : {
        description: "test"
    }
}
