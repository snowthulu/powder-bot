const { SlashCommandBuilder } = require("@discordjs/builders")

module.exports = {
    data: new SlashCommandBuilder()
        .setName("pause")
        .setDescription("pauses the music"),
    run: async ({ client, interaction }) => {
        const queue = client.player.getQueue(interaction.guildId)

        if (!queue)
        return await interaction.editReply("There are no songs in the queue")

        queue.setPauses(true)
        await interaction.editReply("music paused, use `/resume` to resume the music") 
    }
}