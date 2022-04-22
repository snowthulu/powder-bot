const Discord = require('discord.js')

const generateImage = require("./generateImage")

require("dotenv").config()

const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_MESSAGES",
        "GUILD_MEMBERS"
    ]
})

client.on('ready', () => {
    console.log('Logged in as ${client.user.tag}')
})

client.on("messageCreate", (message) => {
    if (message.content == "hi powder"){
        message.reply("hi")
    }
})

const welcomeChannelId = "967020771849437234"

client.on("guildMemberAdd", async (member) => {
    const img = await generateImage(member)
    member.guild.channels.cache.get(welcomeChannelId).send({
        content:`<@${member.id}> welcome to the server!`,
        files: [img]
    })
})

client.login(process.env.TOKEN)