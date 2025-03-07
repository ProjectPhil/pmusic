module.exports.run = async function (bot, interaction) {
    const player = bot.riffy.players.get(interaction.guild.id);
    if (!player) return interaction.reply({ content: "No player found for this guild.", flags: 64 });
    const queue = player.queue.length > 9 ? player.queue.slice(0, 9) : player.queue;
    if (queue.length === 0) return interaction.reply({ content: "The queue is empty.", flags: 64 });

    return interaction.reply({
        embeds: [
            new bot.discord.EmbedBuilder()
                .setColor('#2f3136')
                .setTitle('Now Playing')
                .setThumbnail(player.current.info.thumbnail)
                .setDescription(`[${player.current.info.title}](${player.current.info.uri}) [${bot.ms(player.current.info.length)}]`)
                .setFooter({ text: `Queue length: ${player.queue.length} tracks` })
                .addFields([
                    { name: 'Up Next', value: queue.map(function (track, index) { return `**${index + 1}.** [${track.info.title}](${track.info.uri})` }).join('\n'), },
                ])
        ],
        flags: 64
    });

};

module.exports.info = {
    name: 'queue',
    description: 'view the queue',
};
