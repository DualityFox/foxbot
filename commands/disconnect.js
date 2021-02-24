const Discord = require("discord.js")
const { get } = require("https")
const ytdl = require(`ytdl-core`)

module.exports = {
    run: async (message, args, client,) => {
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                if(!args[1]){
                    message.reply("je me suis déconecter");
                    connection.disconnect();
                }
                else {

                let dispatcher = connection.play(ytdl(args[1], { quality: "highestaudio"}));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("erreur vocal")
                });
            }
            }).catch(err => {
                return message.channel.send("Je n'ai pas réussi à me connecter")
            })
        }
        else {
            return message.reply("je suis même pas connecter")
        }
    },
    name: 'disconnect',
    guildOnly: true,
    help : {
        description: "Arrete de jouer de la musique",
        syntax: ""
    }
}