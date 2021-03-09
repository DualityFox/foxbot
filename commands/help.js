const Discord = require("discord.js")
const config = require("../config.json")
const pagination = require("discord.js-pagination")

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
            const page1 = new Discord.MessageEmbed()
            .setTitle("Liste des commandes")
            .setDescription(`Pour plus d'info sur une commande tapez \`${config.prefix}help [nom de la commande]\``)
            .addField("Sommaire", "Page 1 : ``Sommaire``\nPage 2 : ``⚙️Administration``\nPage 3 : ``🎉Amusement``\nPage 4 : ``📸 Image``\nPage 5 : ``🎵 Musique``\nPage 6 : ``📡 Utilitaire``\nPage 7 : ``📌Autre``\nPage 8 : ``🔗 Lien utile``")
            .setColor('#142c96')
            .setTimestamp();

            const page2 = new Discord.MessageEmbed()
            .setTitle('⚙️ Administration :')
            .setDescription("Voici toutes les commandes d'administration")
            .addField('Liste des commandes', '``ban``・``clear``・``kick``・``mute``・``tempban``・``tempmute``・``unmute``・``warn``・``infractions``',true)
            .setColor('#ff0707')
            .setTimestamp();

            const page3 = new Discord.MessageEmbed()
            .setTitle("🎉 Amusement")
            .setDescription("Voici toutes les commandes d'amusement")
            .addField('Liste des commandes', '``hug``・``kiss``・``pat``・``slap``・``smug``・``tickle``・``feed``・``baka``・``8ball``', true)
            .setColor('#fab701')
            .setTimestamp();

            const page4 = new Discord.MessageEmbed()
            .setTitle("📸 Image")
            .setDescription("Voici toutes les commandes d'image")
            .addField('Liste des commandes','``fox_girl``・``neko``・``waifu``・``meow``', true)
            .setColor('#5a127e')
            .setTimestamp();

            const page5 = new Discord.MessageEmbed()
            .setTitle("🎵 Musique")
            .setDescription("Voici toutes les commandes de musique")
            .addField('Liste des commandes', '``play``・``disconnect``', true)
            .setColor('#216032')
            .setTimestamp();

            const page6 = new Discord.MessageEmbed()
            .setTitle("📡 Utilitaire")
            .setDescription("Voici toutes les commandes utile")
            .addField('Liste des commandes','``ticket``・``close``・``report``', true)
            .setColor('#0e0e0e')
            .setTimestamp();

            const page7 = new Discord.MessageEmbed()
            .setTitle("📌 Autre")
            .setDescription("Voici toutes les autres commandes")
            .addField('Liste des commandes','``help``・``botinfo``・``serverinfo``・``userinfo``', true)
            .setColor('#acaeac')
            .setTimestamp();

            const page8 = new Discord.MessageEmbed()
            .setTitle("🔗 Lien utile")
            .setDescription("Voici tout les liens utile")
            .addField('Liste des liens','[Donne ton avis sur •|Fox Graff|•](https://top.gg/servers/731599872892993626)\n[Vote pour •|Fox Graff|•](https://top.gg/servers/731599872892993626)\n[Donne ton avis et note •|Fox Graff|• sur DISBOARD](https://disboard.org/fr/server/731599872892993626)', false)
            .setColor('#e1137a')
            .setTimestamp();

            const pages = [
                page1,
                page2,
                page3,
                page4,
                page5,
                page6,
                page7,
                page8
            ]

            const emoji = ["⬅️", "➡️"]

            

            pagination(message, pages, emoji)
            
        }
    },
    name: 'help',
    guildOnly: true,
    help : {
        description: "Affiche la page d'aide",
        syntax: "[nom de la commande]"
    }
}
