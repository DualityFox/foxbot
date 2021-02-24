const Discord = require("discord.js")
const { get } = require("https")

module.exports = {
    run: async (message, args, client) => {

        if (!message.channel.nsfw) {
            return message.channel.send("🔞🔞🔞Oula... Va faire ça dans un salon NSFW...🔞🔞🔞");
        }
        
        get("https://nekos.life/api/v2/img/classic",(res) => {
            const { statusCode } = res;
            if (statusCode !== 200) {
                return message.channel.send("Euh... J'ai eu un problème avec l'API...Réessaye.");
            }
    
            res.setEncoding("utf8");
            let rawData = "";
    
            res.on("data", chunk => {
                rawData += chunk;
            });
    
            res.on("end", () => {
                try {
                    const parsedData = JSON.parse(rawData);
    
                    message.channel.send(new Discord.MessageEmbed()
                    .setDescription(`**${message.author.username}** fait l'amour à **${message.mentions.members.first().user.username}**`)
                    .setImage(parsedData.url)
                    .setFooter(`funck | `)
                    .setTimestamp())
                } catch (error) {
                    console.error(error.message);
                }
            });
            if(!message.mentions.members.first() == 1) return message.channel.send(`Tu fait l'amour à ta main où ça se passe comment ???`)
        }).on("error", (error) => {
            console.error(error.meesage);
        });
    },
    name: "funck",
    guildOnly: true,
}