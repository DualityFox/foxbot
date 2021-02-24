const Discord = require("discord.js")

module.exports = {
    run: message => {
        message.channel.send( new Discord.MessageEmbed()
        .setTitle('Liste des commandes')
        .addField('.', `${client.commands.filter(command => command.help).map(command => `\`${command.name}\``).join(' ')}`)
        .setDescription(`Pour plus d'info sur une commande tapez \`${config.prefix}help [nom de la commande]\``)
        .setFooter(`Bot crée par DualityFox#0540`))   
    },
    name: 'test'
}