const Discord = require("discord.js")
const config = require("../config.json")

module.exports = {
    run: (message, args, client) => {
        if (!message.channel.nsfw) {
            return message.channel.send("🔞🔞🔞Cette commande d'aide ne peux étre faite que dans un salon **NSFW** !🔞🔞🔞");
        }
            message.channel.send(new Discord.MessageEmbed()
            .setTitle('Liste des commandes + 18ans')
            .setColor('#01E800')
            .addField('🔞NSFW :', '``boobs``・``femdom``・``fox_girl_lewd``・``funck``・``hentai``・``nekolewd``・``nsfw_avatar``・',true)
            .addField(`\u200b`,`\u200b`, true)
            .addField(`\u200b`,`\u200b`, true)
            .addField('🔗Lien utile :','[Ajoute-moi](https://discord.com/oauth2/authorize?client_id=813734273894842370&scope=bot&permissions=2147483647) | [Donne ton avis sur •|Fox Graff|•](https://top.gg/servers/731599872892993626) | [Vote pour •|Fox Graff|•](https://top.gg/servers/731599872892993626)', false)
            .setThumbnail('https://cdn.discordapp.com/attachments/814095992856641536/814096083482574910/SxvPigf.gif')
            .setFooter('Bot crée par The King DualityFox#2382',)
            .setTimestamp()
            )
    },
    name: 'help18',
    guildOnly: true,
}
