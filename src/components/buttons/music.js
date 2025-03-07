module.exports.run = async function (bot, interaction, options) {
    let args = options.split("-");
    let player = bot.riffy.players.get(interaction.guild.id);
    if (!player) return interaction.reply({ content: "No player found for this guild.", flags: 64 });

    switch (args[0]) {
        case "controls": {
            interaction.update({
                components: [
                    new bot.discord.ActionRowBuilder().addComponents(
                        new bot.discord.ButtonBuilder()
                            .setCustomId("cqcqh")
                            .setLabel("Music controls:")
                            .setStyle(2)
                            .setDisabled(true),
                        new bot.discord.ButtonBuilder()
                            .setCustomId("music-pause")
                            .setLabel(player.paused ? "Resume" : "Pause")
                            .setEmoji({ name: player.paused ? "⏯️" : "⏸️" })
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
            })
            break;
        }
        case "pause": {
            if (player.paused) return interaction.reply(`The player is already paused`);
            player.pause(true);
            interaction.update({
                components: [
                    new bot.discord.ActionRowBuilder().addComponents(
                        new bot.discord.ButtonBuilder()
                            .setCustomId("cqcqh")
                            .setLabel("Music controls:")
                            .setStyle(2)
                            .setDisabled(true),
                        new bot.discord.ButtonBuilder()
                            .setCustomId("music-resume")
                            .setLabel("Resume")
                            .setEmoji({ name: "⏯️" })
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
            })
            break;
        }
        case "resume": {
            if (!player.paused) return interaction.reply(`The player is not paused`);
            player.pause(false);
            interaction.update({
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
            })
            break;
        }
        case "add": {
            interaction.showModal(
                new bot.discord.ModalBuilder()
                    .setCustomId("music-addsong")
                    .setTitle("Add song")
                    .addComponents(
                        new bot.discord.ActionRowBuilder().addComponents(
                            new bot.discord.TextInputBuilder()
                                .setCustomId("song")
                                .setLabel("What song would you like to add?")
                                .setPlaceholder("e.g. song name, url, etc.")
                                .setStyle(1)
                                .setRequired()
                        ),
                    )
            );
            break;
        }
        case "skip": {
            player.stop();
            interaction.update({
                embeds: [
                    new bot.discord.EmbedBuilder()
                        .setColor('#ff0000')
                        .setTitle(`Track Skipped - Now Playing: ${player.queue[0].info.title}`)
                        .setDescription(`**${player.queue[0].info.title}** has been added to the queue.`)
                        .addFields(
                            { name: 'Artist', value: player.queue[0].info.author, inline: true },
                            { name: 'Duration', value: `\`${bot.ms(player.queue[0].info.length)}\``, inline: true }
                        )
                        .setURL(player.queue[0].info.uri)
                        .setThumbnail(player.queue[0].info.thumbnail || 'https://i.imgur.com/4rOoJ6E.png')
                        .setFooter({ text: `Requested by ${player.queue[0].info.requester.user.username}`, iconURL: player.queue[0].info.requester.user.displayAvatarURL() })
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
            break;
        }
        case "stop": {
            player.destroy();
            interaction.update({ content: `**Stopped the music!** `, embeds: [], components: [], flags: 64 })
            break;
        }
    }
}
