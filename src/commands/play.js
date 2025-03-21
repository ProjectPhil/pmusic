/**
 * @param {import("../../../src/index").bot} bot
 * @param {import("../../../src/index").con} con 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports.run = async function (bot, con, interaction, data) {
    const query = interaction.options.getString('track'); // Get the track name or URL from the interaction

    const member = interaction.member; // Get the member who invoked the command
    const voiceChannel = member.voice.channel; // Get the voice channel of the member

    if (!voiceChannel) {
        return interaction.reply({ content: "You need to be in a voice channel to play music!", ephemeral: true });
    }

    const player = bot.riffy.createConnection({
        guildId: interaction.guild.id,
        voiceChannel: voiceChannel.id,
        textChannel: interaction.channel.id,
        deaf: true
    });

    const resolve = await bot.riffy.resolve({ query: query, requester: interaction.user });
    const { loadType, tracks, playlistInfo } = resolve;

    if (loadType === 'playlist') {
        for (const track of tracks) {
            track.info.requester = interaction.user;
            player.queue.add(track);
        }

        await interaction.reply({ content: `Added: \`${tracks.length} tracks\` from \`${playlistInfo.name}\`` });
        if (!player.playing && !player.paused) return player.play();

    } else if (loadType === 'search' || loadType === 'track') {
        const track = tracks.shift();
        track.info.requester = interaction.user;

        player.queue.add(track);
        await interaction.reply({ content: `Added: \`${track.info.title}\`` });
        if (!player.playing && !player.paused) return player.play();
    } else {
        return interaction.reply({ content: 'There are no results found.', ephemeral: true });
    }
}

module.exports.info = {
    name: 'play',
    description: "Play a music track",
    options: [
        { name: 'track', description: 'Track name or URL', type: 3, required: true }
    ]
}
