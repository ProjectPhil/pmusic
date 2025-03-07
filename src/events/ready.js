const { GatewayDispatchEvents } = require("discord.js");
const { Riffy } = require("riffy");

/**
 * @param {import("../../src/index").bot} bot 
 * @param {import("discord.js").Interaction} interaction
 */

module.exports = async function (bot, interaction) {
    if (!bot.application) await bot.application.fetch();
    const commands = [];
    bot.commands.forEach(async function (command) { commands.push(command.info) })
    await new bot.discord.REST().setToken(bot.config.tokens.discordBotToken).put(bot.discord.Routes.applicationCommands(bot.config.tokens.oAuth2ClientID), { body: commands }).then(function (data) {
        bot.Logger(`Successfully registered ${data.length} application commands.`, { color: 'green', title: 'Commands' });
    }).catch(function (e) {
        bot.Logger(e.stack, { color: 'red', title: 'Commands' });
    });

    bot.riffy = new Riffy(bot, bot.config.nodes, {
        send: function (payload) {
            const guild = bot.guilds.cache.get(payload.d.guild_id);
            if (guild) guild.shard.send(payload)
        },
        defaultSearchPlatform: "ytmsearch",
        restVersion: "v4"
    });
    
    bot.riffy.init(bot.user.id);
    bot.riffy.on("nodeConnect", function (node) {
        bot.Logger(`Node "${node.name}" connected.`, { color: 'green', title: 'Node' });
    })
    bot.riffy.on("nodeError", function (node, error) {
        bot.Logger(`Node "${node.name}" encountered an error: ${error.message}.`, { color: 'red', title: 'Node' });
    })
    bot.riffy.on("queueEnd", async function (player, interaction) {
        let channel = bot.channels.cache.get(player.textChannel);
        if (!channel) return bot.Logger(`Channel not found for player ${player.guildId}`, { color: 'red', title: 'Queue' });

        const autoplay = false;
        if (autoplay) {
            player.autoplay(player);
        } else {
            player.destroy();
            channel.send({ content: `**Stopped the music!** `, embeds: [], components: [], flags: 64 })
        }
    });
    bot.on("raw", function (d) {
        if (![GatewayDispatchEvents.VoiceStateUpdate, GatewayDispatchEvents.VoiceServerUpdate,].includes(d.t)) return;
        bot.riffy.updateVoiceState(d);
    });
}