const Discord =require("discord.js");
const moment = require("moment");

module.exports = {

    run: async (message, args, client) => {

        message.channel.send(new Discord.MessageEmbed()
        .setDescription(`Information sur **${client.user.tag}**`)
        .setThumbnail(client.user.displayAvatarURL(String))
        .addField('ID :', '722338677925216269',true)
        .addField('Crée le :',moment.utc(client.user.createdAt).format("LLL"),true)
        .addField(`\u200b`,`\u200b`, true)
        .addField('Créateur :','DualityFox#0540', true)
        .addField('Créateur photo de profil :', '•Nounard•#3873',true)
        .addField(`\u200b`,`\u200b`, true)
        .addField('Nombre de serveurs :', `${client.guilds.cache.size}`,true)
        .addField("Nombre d'utilisateurs :",`${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`, true)
        .addField(`\u200b`,`\u200b`, true)
        .addField("Mémoire :",`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MégaBits`,true)
        .addField('Uptime :',`${Math.floor(client.uptime / 1000 / 60).toString()} minutes`,true)
        .addField(`\u200b`,`\u200b`, true)
        .addField("Version :","discord.js@12.3.1", true)
        .addField('Source :','[GitHub](https://github.com/DualityFox/DualityBot)',true)
        .addField('Support :', '[DualityBotServ](https://discord.gg/axBSnCU)')
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