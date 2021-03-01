const Discord = require(`discord.js`),
client = new Discord.Client(),
config = require("./config.json"),
fs = require(`fs`)

client.login(config.token)
client.commands = new Discord.Collection()
client.db = require('./db.json')

fs.readdir('./commands', (err, files) => {
    if (err) throw err
    files.forEach(file => {
        if (!file.endsWith('.js')) return
        const command = require(`./commands/${file}`)
        client.commands.set(command.name, command)
    })
})

client.on('message', message => {
    if (message.type !== 'DEFAULT' || message.author.bot) return

    const args = message.content.trim().split(/ +/g)
    const commandName = args.shift().toLowerCase()
    if(!commandName.startsWith(config.prefix)) return
    const command = client.commands.get(commandName.slice(config.prefix.length))
    if (!command) return message.channel.send(`La commande \`${message.content}\` n'a pas était trouvé !`)
    if (command.guildOnly && !message.guild) return message.channel.send('Je ne répond pas au commande en mp !')
    command.run(message, args, client)
})
client.on(`guildMemberAdd`, member => {
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(new Discord.MessageEmbed()
            .setTitle(`Bienvenue ${member.user.username}`)
            .setDescription(`Bienvenue sur •|Fox Graff|•`)
            .setColor('random')
            .addField(`${member.user.username}`,`${member.user.username}, nous te souhaitons tous la bienvenue sur •|Fox Graff|• !!!\nPasse un bon moment et respecte les règles`)
            .setThumbnail('https://cdn.discordapp.com/attachments/813735778374123533/814518794491920384/04ad7d2f130e6b7e6fa11c85436715b1.png')
            .setTimestamp()
            )
})

client.on(`guildMemberRemove`, member => {
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`Oh non !!! ${member.user.tag} nous a quitté ... 😢`)
})

client.on( 'ready', () => {
    client.user.setStatus("dnd")
    const statuses = [
        () => `•|Fox Graff|•`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0) - 26} membres sur •|Fox Graff|• !`,
        () => `Je suis un robot déguisé en renard déguisé en robot !`,
        () => `Merci à Nounard 👁⃤ pour ma magnique photo de profil`,
        () => `Mon préfix est fb!`
        
    ]
    let i = 0
    setInterval(() => {
        client.user.setActivity(statuses[i](), {type: `WATCHING`,})
        i = ++i % statuses.length
    },1e4)
})

client.on('channelCreate', channel => {
    if (!channel.guild) return
    const muteRole = channel.guild.roles.cache.find(role => role.name === 'Muted by •|Fox Bot|•')
    if (!muteRole) return
    channel.createOverwrite(muteRole, {
        SEND_MESSAGES: false,
        CONNECT: false,
        ADD_REACTIONS: false
    })
})
