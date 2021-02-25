const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    run: (message, args, client) => {
        if (args[0]) {
            const command = client.commands.get(args[0].toLowerCase())
            if (!command || !command.help) return message.channel.send("Cette commande n'existe pas.")
            message.channel.send(new Discord.MessageEmbed()
            .setDescription(`Commande : **${command.name}**\n\n${command.help.description}\n\nSyntaxe : \`${config.prefix}${command.name} ${command.help.syntax ? `${command.help.syntax}` : " "}\``)
            .setFooter("[] = Obligatoire\n<> = Facultatif"))
        }
        else {
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Liste des commandes')
            .setDescription(`Pour plus d'info sur une commande tapez \`${config.prefix}help [nom de la commande]\``)
            .setColor('#01E800')
            .addField('⚙️Administration :', '``ban``・``clear``・``kick``・``mute``・``tempban``・``tempmute``・``unmute``・``warn``・``infractions``',true)
            .addField('🎉Amusement :', '``hug``・``kiss``・``pat``・``slap``・``smug``・``tickle``・``feed``・``baka``', true)
            .addField('🎵Musique :', '``play``・``disconnect``', true)
            .addField('📸Image :','``fox_girl``・``neko``・``waifu``・``meow``', true)
            .addField('🔞||NSFW|| :', '||``boobs``||・||``femdom``||・||``fox_girl_lewd``||・||``funck``||・||``hentai``||・||``nekolewd``||・||``nsfw_avatar``||',true)                    
            .addField('📌Autre :','``help``・``botinfo``', true)
            .addField('🔗Lien utile (Actuellement indisponible) :','[Ajoute-moi] | [Serveur de support] | [Vote pour le serveur](https://top.gg/servers/731599872892993626)', false)
            .setThumbnail('https://cdn.discordapp.com/attachments/722009128448426005/726462278853197865/54772.gif')
            .setFooter('Bot crée par The King DualityFox#2382',)
            .setTimestamp()
            )
        }
    },
    name: 'help',
    guildOnly: true,
    help : {
        description: "Affiche la page d'aide",
        syntax: "[nom de la commande]"
    }
}
