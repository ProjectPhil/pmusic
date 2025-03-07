module.exports.run = async function (bot, interaction, options) {
    let args = options.split("-");
    let player = bot.riffy.players.get(interaction.guild.id);
    if (!player) return interaction.reply({ content: "No player found for this guild.", flags: 64 });
    switch (args[0]) {
        case "addsong": {
            let input = interaction.fields.fields.get('song').value;
            if (!input) return interaction.reply({ content: "Please provide a song to add.", flags: 64 });
            await bot.riffy.resolve({ query: input, requester: interaction.member }).then(function (resolve) {
                const track = resolve.tracks.shift();
                track.info.requester = interaction.member;
                player.queue.add(track);
                interaction.reply({ content: `**${track.info.title}** has been added to the queue.`, flags: 64 });
            });
        }
    }
}