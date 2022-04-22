console.log('bot started')

const Discord = require('discord.js')
const dotenv = require("dotenv")

const generateImage = require("./generateImage")
const { intersection } = require('zod')

dotenv.config()
const TOKEN = process.env.TOKEN

const LOAD_SLASH = process.argv[2] == "load"

const CLIENT_ID = "967003092786761778"
const GUILD_ID = "938584904126566481"

const client = new Discord.Client({
    intents:[
        "GUILDS",
        "GUILD_VOICE_STATES",
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
    if (message.content == "powder"){
        message.reply("that's me")
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

client.login(TOKEN)
