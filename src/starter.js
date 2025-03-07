/**
 * @param {import("../src/index").bot} bot
 */
module.exports = async function (bot) {
    console.clear()
    await bot.figlet.text("PMusic", async function (e, text) {
        if (e) return bot.Logger(e.stack, { title: "error", color: "red" });
        bot.Logger(text, { color: "blue" });
        bot.app.listen(bot.config['SiteInformation'].ProcessPort)
        await bot.login(bot.config.tokens.discordBotToken).catch(function (e) {
            if (e) { bot.Logger(e.stack, { title: "error", color: "red" }); process.exit() }
        })
        bot.Logger(`Logged in as ${bot.user.tag} | Bot ID: ${bot.user.id}`, { title: "Success", color: "green" });
        bot.Logger(`${bot.guilds.cache.size} Guilds | ${bot.users.cache.size} Users | Port: ${bot.config['SiteInformation'].ProcessPort}`, { title: "Info", color: "yellow" });
        bot.Logger(`Created by Project Phil - https://projectphil.co.uk`, { title: "Info", color: "yellow" });
        bot.Logger(`Invite Link: https://discord.com/api/oauth2/authorize?client_id=${bot.user.id}&permissions=8&scope=applications.commands%20bot`, { title: "Invite", color: "cyan" });
        bot.Logger(`Support Server: https://prophil.link/discord`, { title: "Support", color: "cyan" });
        bot.Logger(`Bugs Report: https://bugs.projectphil.co.uk`, { title: "Bug", color: "red" });
    })
}