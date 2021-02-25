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
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`Bienvenue ${member}.\n`)
})

client.on(`guildMemberRemove`, member => {
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`${member.user.tag} a quitté le serveur... 😢`)
})

client.on( 'ready', () => {
    client.user.setStatus("dnd")
    const statuses = [
        () => `bientôt •|Fox Graff|•`,
        () => `${client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)} utilisateurs`
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
