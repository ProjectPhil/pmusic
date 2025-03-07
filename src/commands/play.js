/**
 * @param {import("../../../src/index").bot} bot
 * @param {import("../../../src/index").con} con 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports.run = async function (bot, con, interaction, data) {
    let serverUUID = interaction.options.getString('server_uuid');
    con.query(`SELECT * FROM modules WHERE uuid = ?`, [serverUUID], function (e, rows) {
        if (e) return interaction.reply({ content: `An error occurred while querying the database: ${e.message}`, flags: 64 });
        if (!rows.length) return interaction.reply({ content: "No server found with that UUID.", flags: 64 });
        GetMcInfo(rows, interaction, "/v1/players/all").then(function (data) {
            console.log(data);

            // Create chart with player data
            bot.chart.create({
                interaction: interaction,
                title: 'Joined Players Info',
                color: '#00FF00',
                fields: data.map(function (playerData) {
                    let lastPlayed = playerData.lastPlayed.toString().slice(0, -3);
                    return {
                        name: `${playerData.name}'s Info`,
                        value: `**UUID**: \`${playerData.uuid}\`\n**Whitelisted**: \`${playerData.whitelisted}\`\n**Banned**: \`${playerData.banned}\`\n**Operator**: \`${playerData.op}\`\n**Last Played**: <t:${lastPlayed}:R>`,
                        inline: false
                    };
                }),
                timestamp: true
            }).catch(function (e) {
                return interaction.reply({ content: `An error occurred while creating the chart: ${e.message}`, flags: 64 });
            });
        }).catch(function (e) {
            interaction.reply({ content: `An error occurred while fetching Minecraft info: ${e.message}`, flags: 64 });
        });
    });
}

module.exports.info = {
    name: 'mc-joinedplayers',
    description: "Get All Players Info",
    options: [
        { name: 'server_uuid', description: 'Server UUID', type: 3, required: true }
    ]
}
