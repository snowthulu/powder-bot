const { SlashCommandBuilder } = require("@discordjs/builders")
const { MessageEmbed } = require("discord.js")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("info")
        .setDescription("displays info about the currently playing song"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        return await interaction.editReply("There are no songs in the queue")

        let bar = queue.createProgressbar({
            queue: false,
            length: 19
        })

        const song = queue.current

        await interaction.editReply({
            embeds: [new MessageEmbed()
            .setThumbnail(song.thumbnail)
            .setDescription(`Current Playing [${song.title}](${song.url})\n\n` + bar)
            ], 
        }) 
    }
}