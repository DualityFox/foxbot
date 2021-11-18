const Discord =require("discord.js");
const moment = require("moment");

module.exports = {

    run: async (message, args, client) => {
        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Information sur **${client.user.tag}**`)
        .setThumbnail(client.user.displayAvatarURL(String))
        .addField('ID :', '813734273894842370',true)
        .addField('Crée le :',moment.utc(client.user.createdAt).format("LLL"),true)
        .addField(`\u200b`,`\u200b`, true)
        .addField('Créateur :','<@828964270342406174>(<@801728158725439490>)', true)
        .addField('Créateur photo de profil :', '<@897520302068760586>',true)
        .addField(`\u200b`,`\u200b`, true)
        .addField('Nombre de serveurs :', `${client.guilds.cache.size}`,true)
        .addField("Nombre d'utilisateurs :",`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, true)
        .addField(`\u200b`,`\u200b`, true)
        .addField("Mémoire :",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MégaBits`,true)
        .addField('Uptime :',`${Math.floor(client.uptime / 1000 / 60).toString()} minutes`,true)
        .addField(`\u200b`,`\u200b`, true)
        .addField("Version :","discord.js@12.3.1", true)
        .addField('Source :','[GitHub](https://github.com/DualityFox/Code-de-FoxBot-de-FoxGraff-Version-public-)',true)
        .addField('Support :', 'Aucun serveur de support')
        .setFooter(`Information sur ${client.user.username}`)
        .setTimestamp()
        )
    },
    name: "botinfo",
    guildOnly: true,
    help : {
        description: "Donne des infos sur le bot"
    }
}
