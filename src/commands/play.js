/**
 * @param {import("../../src/index").bot} bot
 * @param {import("../../src/index").con} con 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports.run = function (bot, interaction) {
    const query = interaction.options.getString('query');
    const player = bot.riffy.createConnection({ guildId: interaction.guild.id, voiceChannel: interaction.member.voice.channel.id, textChannel: interaction.channel.id, deaf: true });

    bot.riffy.resolve({ query: query, requester: interaction.member }).then(function (resolve) {
        const { loadType, tracks, playlistInfo } = resolve;
        let info = "";
        if (loadType === 'playlist') {
            for (const track of resolve.tracks) {
                track.info.requester = interaction.member;
                player.queue.add(track);
            }
            info = `Added ${tracks.length} songs from the playlist **${playlistInfo.name}**.`;
        } else if (loadType === 'search' || loadType === 'track') {
            const track = tracks.shift();
            track.info.requester = interaction.member;
            player.queue.add(track);
            info = `Added **${track.info.title}** to the queue.`;
        } else {
            return interaction.reply({ content: `There were no results found for your query.`, flags: 64 });
        }

        // Send the reply with the embed and buttons
        interaction.reply({
            embeds: [
                new bot.discord.EmbedBuilder()
                    .setColor('#0099ff')
                    .setTitle('Now Playing')
                    .setFooter({ text: `Requested by ${interaction.member.user.username}`, iconURL: interaction.member.user.displayAvatarURL() })
                    .setDescription(info)
            ],
            components: [
                new bot.discord.ActionRowBuilder().addComponents(
                    new bot.discord.ButtonBuilder()
                        .setCustomId("cqcqh")
                        .setLabel("Music controls:")
                        .setStyle(2)
                        .setDisabled(true),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-pause")
                        .setLabel("Pause")
                        .setEmoji({ name: "⏸️" })
                        .setStyle(1),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-skip")
                        .setLabel("Skip")
                        .setStyle(1),
                ),
                new bot.discord.ActionRowBuilder().addComponents(
                    new bot.discord.ButtonBuilder()
                        .setCustomId("cqcdqh")
                        .setLabel("Volume:")
                        .setStyle(2)
                        .setDisabled(true),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-volumeup")
                        .setLabel("Volume Up")
                        .setEmoji({ name: "⬆️" })
                        .setStyle(2),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-volumedown")
                        .setLabel("Volume Down")
                        .setEmoji({ name: "⬇️" })
                        .setStyle(2),
                ),
                new bot.discord.ActionRowBuilder().addComponents(
                    new bot.discord.ButtonBuilder()
                        .setCustomId("hqhq7h7qc")
                        .setLabel("Extra:")
                        .setStyle(2)
                        .setDisabled(true),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-add")
                        .setLabel("Add song")
                        .setStyle(1),
                    new bot.discord.ButtonBuilder()
                        .setCustomId("music-stop")
                        .setLabel("Stop")
                        .setStyle(4)
                ),
            ],
            flags: 64
        });

        // Play the track if not already playing
        if (!player.playing && !player.paused) {
            player.play();
            console.log("Playing track:", player.queue.current); // Log the current track being played
        }
    }).catch(err => {
        console.error("Error resolving track:", err);
        return interaction.reply({ content: `An error occurred: ${err.message}`, flags: 64 });
    });
}

module.exports.info = {
    name: 'play',
    description: 'Play a track',
    inVoice: true,
    options: [
        { name: 'query', description: 'The query to search for', type: 3, required: true }
    ],
}