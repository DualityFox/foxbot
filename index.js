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
replies = [`<@${user.id}> ! Bienvenue sur •|Fox Graff|• !`, `Accueillions tous <@${user.id}> qui débarque sur •|Fox Graff|• !`, `Oh ! Un(e) petit(e) nouveau(elle) !\nBienvenue à toi <@${user.id}> !`, `<@${user.id}>, bonjour, passe un bon moment sur •|Fox Graff|• !`]
client.on(`guildMemberAdd`, member => {
    member.guild.channels.cache.find(channel => channel.id === "814123969359249460").send(`${replies[Math.floor(Math.random() * replies.length)]}`)
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
