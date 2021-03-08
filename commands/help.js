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
            .addField('⚙️ Administration :', '``ban``・``clear``・``kick``・``mute``・``tempban``・``tempmute``・``unmute``・``warn``・``infractions``',true)
            .addField('🎉 Amusement :', '``hug``・``kiss``・``pat``・``slap``・``smug``・``tickle``・``feed``・``baka``・``8ball``', true)
            .addField('📸 Image :','``fox_girl``・``neko``・``waifu``・``meow``', true)
            .addField('🎵 Musique :', '``play``・``disconnect``', true)
            .addField('📡 Utilitaire:','``ticket``・``close``・``report``', true)
            .addField('📌Autre :','``help``・``botinfo``・``serverinfo``・``userinfo``', true)
            .addField('🔗 Lien utile :','[Donne ton avis sur •|Fox Graff|•](https://top.gg/servers/731599872892993626) | [Vote pour •|Fox Graff|•](https://top.gg/servers/731599872892993626) | [Donne ton avis et note •|Fox Graff|• sur DISBOARD](https://disboard.org/fr/server/731599872892993626)', false)
            .setThumbnail('https://cdn.discordapp.com/attachments/722009128448426005/726462278853197865/54772.gif')
            .setFooter('Bot crée par DuALiTyFoX#8912',)
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
