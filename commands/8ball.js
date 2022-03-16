const Discord = require('discord.js'),
    replies = ['Oui', 'Non', 'Peut être', 'Evidemment', 'Je ne sais pas', 'Je me pose moi même la question']
 
module.exports = {
    run: (message, args) => {
        const question = args.join(' ')
        if(message.mentions.members.first()) return message.channel.send('Demande lui directement')
        if (!question) return message.channel.send('Veuillez indiquer une question.')
        message.channel.send(new Discord.MessageEmbed()
            .addField(`Question`,`${question}`)
            .addField(`Réponse`,`${replies[Math.floor(Math.random() * replies.length)]}`))
    },
    name: '8ball',
    guildOnly: true,
    help : {
        description: "Poser une question le bot vous répond",
    }
}
